import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import validator from 'validator'

import FormService from "../services/forms.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const vprojectname = value => {
  if (value.length < 10 || value.length > 50) {
    return (
      <div className="alert alert-danger" role="alert">
        The project name must be between 10 and 50 characters.
      </div>
    );
  }
};

const vstartdate = (value) => {
  if (!validator.isDate(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        The start date is not a valid date;
      </div>
    );
  }
}

const venddate = (value) => {
  if (!validator.isDate(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        The start date is not a valid date;
      </div>
    );
  }
}

const vpmname = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The project manager name must be between 3 and 20 characters.
      </div>
    );
  }
};

const vsublobname = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The project manager name must be between 3 and 20 characters.
      </div>
    );
  }
};

const vcustomername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The project manager name must be between 3 and 20 characters.
      </div>
    );
  }
};

export default class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.handleCreateProject = this.handleCreateProject.bind(this);
    this.onChangeProjectName = this.onChangeProjectName.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.onChangePMName = this.onChangePMName.bind(this);
    this.onChangeSubLobName = this.onChangeSubLobName.bind(this);
    this.onChangeCustomerName = this.onChangeCustomerName.bind(this);


    this.state = {
      projectName: "",
      startDate: "",
      endDate: "",
      pmName: "",
      subLobName: "",
      customerName: "",
      successful: false,
      message: ""
    };
  }

  onChangeProjectName(e) {
    this.setState({
      projectName: e.target.value
    });
  }

  onChangeStartDate(e) {
    this.setState({
      startDate: e.target.value
    });
  }

  onChangeEndDate(e) {
    this.setState({
      endDate: e.target.value
    });
  }

  onChangePMName(e) {
    this.setState({
      pmName: e.target.value
    });
  }

  onChangeSubLobName(e) {
    this.setState({
      subLobName: e.target.value
    });
  }

  onChangeCustomerName(e) {
    this.setState({
      customerName: e.target.value
    });
  }

  handleCreateProject(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      FormService.createProject(
        this.state.projectName,
        this.state.startDate,
        this.state.endDate,
        this.state.pmName,
        this.state.subLobName,
        this.state.customerName
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="formcss">
      <div className="col-md-8">
          <Form
            onSubmit={this.handleCreateProject}
             ref={c => {
              this.form = c;
             }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="projectName">Project Name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="projectName"
                    value={this.state.projectName}
                    onChange={this.onChangeProjectName}
                    validations={[required, vprojectname]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="startDate">Start Date</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="startDate"
                    value={this.state.startDate}
                    onChange={this.onChangeStartDate}
                    validations={[required, vstartdate]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="endDate">End Date</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="endDate"
                    value={this.state.endDate}
                    onChange={this.onChangeEndDate}
                    validations={[required, venddate]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="pmName">Project Manager</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="pmName"
                    value={this.state.pmName}
                    onChange={this.onChangePMName}
                    validations={[required, vpmname]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subLobName">Sub Lob Name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="subLobName"
                    value={this.state.subLobName}
                    onChange={this.onChangeSubLobName}
                    validations={[required, vsublobname]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="customerName">Customer Name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="customerName"
                    value={this.state.customerName}
                    onChange={this.onChangeCustomerName}
                    validations={[required, vcustomername]}
                  />
                </div>
                <br/>
                <div className="form-group">
                  <button className="btn btn-primary btn-block">Create Project</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            { <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            /> }
          </Form>
        </div>
        </div>
    );
  }
}
