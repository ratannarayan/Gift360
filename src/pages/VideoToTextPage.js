import React, { Component } from "react";
import Header from "./Header";
import VideoToText from "./VideoToText";
import Footer from "./Footer";

export default class VideoToTextPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: "",
        company: "",
        email: "",
        phone: "",
        projectIdea: "",
      },
    };
  }

  componentDidMount() {
    window.scroll(0, 0);
  }

  onChange = (event) => {
    this.setState({
      data: {
        // eslint-disable-next-line react/no-access-state-in-setstate
        ...this.state.data,
        [event.target.name]: event.target.value,
      },
    });
  };

  resetForm = () => {
    this.setState({
      data: {
        name: "",
        company: "",
        email: "",
        phone: "",
        projectIdea: "",
      },
    });
  };

  render() {
    const { data } = this.state;

    return (
      <>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Header {...this.props} />
        <VideoToText
          data={data}
          onChange={this.onChange}
          resetForm={this.resetForm}
        />
        <Footer />
      </>
    );
  }
}
