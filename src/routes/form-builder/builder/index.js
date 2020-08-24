import React, {Component, createRef} from "react";
import {Helmet} from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import IntlMessages from "Util/IntlMessages";
import $ from "jquery";

import {Button} from "reactstrap";
import {Field, Form, reduxForm} from "redux-form";
import {renderField} from "../../../forms/ComonForm";
import {connect} from "react-redux";
import {uploadFormRequest, uploadReset} from "Actions/UploadCreateForm";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import {NotificationContainer} from "react-notifications";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {NotificationManager} from "react-notifications";
import {reset} from 'redux-form';

global.jQuery = $;
global.$ = $;

require("jquery-ui-sortable");
require("formBuilder/dist/form-builder.min");
require("formBuilder/dist/form-render.min");
class BuilderCreateForm extends Component{
    state = {
        formData: null,
      formSaved : false,

    };
    fb = createRef();
    rf = createRef();
    option = {
        disabledActionButtons: ['data','save','clear'],
        fieldRemoveWarn: true,
    };

    formBuilder = null;
    formRender = null;
    componentDidMount() {

        this.formBuilder = $('#editor-form',this.fb.current).formBuilder(this.option);
        $(this.rf.current).toggle();

    }

    onSave(){
        $(this.fb.current).toggle();
        $(this.rf.current).toggle();
       this.formRender = $('#view-form',this.rf.current).formRender({
            formData: this.formBuilder.actions.getData('json')
        });


    }
    onClear(){
        this.formBuilder.actions.clearFields()
    }

    onEdit(e){
        $(this.fb.current).toggle();
        $(this.rf.current).toggle();
    }
    onUpload(e){
        e.formDataJson=this.formRender.userData;
        if (e.formDataJson.length === 0){
            NotificationManager.error('Please add fields to the form to upload.')
        }
        else {
            return this.props.uploadFormRequest(e);
        }
    }
    componentDidUpdate(prevProps){
        if (this.props.uploaded){
            this.onClear();
            $(this.fb.current).toggle();
            $(this.rf.current).toggle();
            return this.props.uploadReset();
        }
    }
    render(){
        const{match,handleSubmit,isUploading} = this.props;

        return(
            <div className="ecom-dashboard-wrapper">
                <NotificationContainer/>
                <Helmet>
                    <title>Polucon | Form-Builder</title>
                    <meta name="description" content="Form Builder" />
                </Helmet>

                <PageTitleBar title={<IntlMessages id="sidebar.createForm" />} match={match} />
                <RctCollapsibleCard
                    heading="Create Form"
                    collapsible
                    fullBlock
                >
                  <div className="container">
                      <div ref={this.fb}>
                          <div id="editor-form"/>
                          <div className="d-flex justify-content-center">
                              <Button onClick={() => this.onSave()} outline  color="info">Save</Button>

                              <Button onClick={() => this.onClear()} outline color="warning">Clear</Button>
                          </div>
                      </div>
                      <div ref={this.rf}>

                          <div id="view-form"/>
                          <Form onSubmit={handleSubmit(this.onUpload.bind(this))}>
                              <Field name="description" label="Form Description" type="text" placeholder="Description" component={renderField}/>
                              <Field name="name" label="Form Name" type="text" placeholder="Name" component={renderField}/>
                              {isUploading ? <RctPageLoader/>:
                                  <div className="d-flex justify-content-center">
                                      <Button color="success" type="submit" outline>Upload</Button>

                                      <Button onClick={this.onEdit.bind(this)} outline>Edit</Button>
                                  </div>

                              }
                          </Form>
                      </div>
                  </div>
                    <br></br>

                </RctCollapsibleCard>


            </div>
        );
    }
}
const mapDispatchToProps = {
    uploadFormRequest,
    uploadReset
};
const mapStateToProps = state =>({
    ...state.formBuilderRed
});

export default  reduxForm({form:'uploadCreatedForm'})(connect(mapStateToProps,mapDispatchToProps)(BuilderCreateForm))


