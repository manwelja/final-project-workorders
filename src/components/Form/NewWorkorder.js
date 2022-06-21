import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import Button from "../Button";
import Select from 'react-select';

import axios from 'axios';

import './workorderForm.css';

//Cloudinary API environment variables
const API_CLOUD_ID = process.env.REACT_APP_API_CLOUD_ID;
const API_CLOUD_PRESET = process.env.REACT_APP_API_CLOUD_PRESET;

export default function NewWorkorder(props) {

  const { onCancel, onSave, student_id, student_email } = props;

  const [state, setState] = useState({
    modules: [{}],
    selectedModule: "",
    categories: [{}],
    selectedCategory: "",
    selectedFileUpload: "",
  });

  const [description, setDescription] = useState("");
  const [link_to_module, setLinkToModule] = useState("");
  const [environment, setEnvironment] = useState("");
  const [loading, setLoading] = useState(false);
  const [saveButton, setSaveButton] = useState("Save Me!");

  // update the state to selected module from dropdown menu
  const handleModuleChange = (event) => {
    setState(prev => ({ ...prev, selectedModule: event.value }));
  };

  // update the state to selected category from dropdown menu
  const handleCategoryChange = (event) => {
    setState(prev => ({ ...prev, selectedCategory: event.value }));
  };

  // update state when
  const handleFileChange = (event) => {
    setState(prev => ({ ...prev, selectedFileUpload: event.target.files[0] }));
  };

  // reset all states when cancel button is clicked
  function resetFormState() {
    setState(prev => ({ ...prev, selectedModule: "", selectedCategory: "", selectedFileUpload: "" }));
    setDescription("");
    setLinkToModule("");
    setEnvironment("");
    onCancel();
  }

  // function to upload a user's screenshot to cloudinary
  function uploadToCloudifyData() {
    const url = `https://api.cloudinary.com/v1_1/${API_CLOUD_ID}/upload`;
    const fd = new FormData();
    fd.append("upload_preset", API_CLOUD_PRESET);
    fd.append("tags", "workorder_system_upload"); // Optional - add tag for image admin in Cloudinary
    fd.append("file", state.selectedFileUpload);
    const config = {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    };
    return axios.post(url, fd, config)
      .then((res) => {
        postToDatabase(res.data.secure_url);
      })
      .catch((err) => console.error(err));
  }

  // post data to db pertaining to the user's selection in the request form
  const postToDatabase = (filePath = "") => {
    return axios.post(`api/workorders`,
      {
        user_student_id: student_id,
        category_id: parseInt(state.selectedCategory),
        module_id: parseInt(state.selectedModule),
        environment: environment,
        description: description,
        link_to_module: link_to_module,
        screenshot_url: filePath
      })
      .then((res) => {
        return;
      })
      .catch((err) => console.error(err));

  };

  // upload screenshot to cloudinary and post to db is screenshot exists, otherwise post to db
  function saveData() {
    state.selectedFileUpload ? uploadToCloudifyData() : postToDatabase();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSaveButton("Saved!");
    }, 1000);
    setTimeout(() => {
      onSave();
    }, 2000);
  }

  //populate the workorder when the application loads
  useEffect(() => {
    Promise.all([
      axios.get(`/api/modules`),
      axios.get(`/api/categories`),
    ])
      .then((all) => {
        // format modules for select box
        const formattedModules = all[0].data.map((itm) => ({ value: itm.id, label: itm.topic }));
        const formattedCategories = all[1].data.map((itm) => ({ value: itm.id, label: itm.description }));
        setState(prev => ({ ...prev, modules: formattedModules, categories: formattedCategories }));
      })
      .catch((err) => { console.error(err); });
  }, []);

  return (
    <main class="workorder-form-main--new">
      <form class="workorder-form" autoComplete="off" onSubmit={event => event.preventDefault()}>
        <section class="wo-form-container--new">
          <div class="wo-form-header">
            <div class="wo-form-title-container">
              <h1>New Help Request</h1>
            </div>
          </div>
          <div class="wo-form-label-data">
            <div class="wo-form-label"><label>Student Email:</label></div>
            <div class="wo-form-data">{student_email}</div>
          </div>
          <div class="wo-form-label-data">
            <div class="wo-form-label"><label>Link to module:</label></div>
            <div class="wo-form-data">
              <input
                class="wo-form-text-box"
                name="module-link"
                type="text"
                placeholder="Enter URL here"
                value={link_to_module}
                onChange={(event) => {
                  setLinkToModule(event.target.value);
                }}
              />
            </div>
          </div>
          <div class="wo-form-label-data">
            <div class="wo-form-label"><label>Please describe your issue:</label></div>
            <div class="wo-form-data">
              <input
                class="wo-form-text-box"
                name="description"
                type="text"
                placeholder="What's up?"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </div>
          </div>
          <div class="wo-form-label-data">
            <div class="wo-form-label"><label>Please specify your computer environment:</label></div>
            <div class="wo-form-data">
              <input
                class="wo-form-text-box"
                name="environment"
                type="text"
                placeholder="e.g. M1, Vagrant, Windows?"
                value={environment}
                onChange={(event) => {
                  setEnvironment(event.target.value);
                }}
              />
            </div>
          </div>
          <div class="wo-form-label-data">
            <div class="wo-form-label"><label>Please specify the category:</label></div>
            <div class="wo-form-data">
              <Select
                options={state.categories}
                onChange={handleCategoryChange}
              />
            </div>
          </div>

          <div class="wo-form-label-data">
            <div class="wo-form-label"><label>Please specify which framework/language you're working with:</label></div>
            <div class="wo-form-data">
              <Select
                styles={{ color: 'darkgrey' }}
                options={state.modules}
                onChange={handleModuleChange}
              />
            </div>
          </div>
          <div class="wo-form-label-data">
            <div class="wo-form-label"><label>Please provide a screenshot if applicable:</label></div>
            <div class="wo-form-data">
              <label for="file-upload" class="custom-file-upload">
                Upload Screenshot
              </label>
              <input id="file-upload" type="file" accept="image/png, image/jpeg" onChange={handleFileChange}></input>
              <span id="file-chosen">{state.selectedFileUpload.name}</span>
            </div>
          </div>
          <div class="wo-form-footer">
            <div><Button className="button--danger" danger onClick={() => { resetFormState(); }}>Cancel</Button></div>
            <div>
              {loading && <Spinner className="spinner" animation="border" />}
              {!loading && <Button className="button--confirm" confirm onClick={() => { saveData(); }}>{saveButton}</Button>}
            </div>
          </div>
        </section>
      </form>
    </main>
  );
};
