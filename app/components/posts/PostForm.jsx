import autobind from 'autobind-decorator';
import React from 'react';
import wrapForm from 'app/components/utils/wrapForm';

const { Component, PropTypes } = React;

class PostForm extends Component {
  @autobind
  handleSubmit(event) {
    event.preventDefault();
    let { titleValue: title, bodyValue: body } = this.props;
    this.props.onSubmit({title, body});
  }

  render() {
    let { WrappedInput } = this.props;

    return (
      <form className="post-form" onSubmit={this.handleSubmit}>
        <label htmlFor="post-form__title-input">Title</label>
        <WrappedInput
          field="title"
          id="post-form__title-input"
        />

        <label htmlFor="post-form__body-input">Body</label>
        <WrappedInput
          field="body"
          inputType="textarea"
          id="post-form__body-input"
        />

        <button>Submit</button>
      </form>
    );
  }
}

PostForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default wrapForm({
  component: PostForm,
  fields: ['title', 'body'],
  initVals: (props) => props.post
});
