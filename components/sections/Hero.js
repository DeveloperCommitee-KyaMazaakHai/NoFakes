import React, { useCallback, useState } from 'react';
import { useDispatch } from "react-redux";
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import Input from "../elements/Input";
import Checkbox from "../elements/Checkbox";
import FormHint from "../elements/FormHint";
import * as homeActions from "../../store/actions/Home";
import Loader from "react-loader-spinner";
import Router from 'next/router'
import FormLabel from "../elements/FormLabel";

const publicIp = require('public-ip');

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

const Hero = ({ className, topOuterDivider, bottomOuterDivider, topDivider, bottomDivider, hasBgColor, invertColor,
                ...props }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [newSubmission, setNewSubmission] = useState(false);
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [message, setMessage] = useState("");

  const [emailValidation, setEmailValidation] = useState(true);
  const [phoneValidation, setPhoneValidation] = useState(true);
  const [messageValidation, setMessageValidation] = useState(true);

  const dispatch = new useDispatch();

  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const mobileRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

  const newSubmissionChecked = (event) => {
    setNewSubmission(event.target.checked);
  }

  const emailHandler = (event) => {
    setEmail(event.target.value);
  }
  const mobileHandler = (event) => {
    setMobileNumber(event.target.value);
  }

  const messageHandler = (event) => {
    setMessage(event.target.value);
  }

  const submitHandler = useCallback(async () => {
    if (newSubmission && email !== "" && !emailRegex.test(email.toLowerCase())) {
      setEmailValidation(false);
    }
    if (newSubmission && mobileNumber !== "" && !mobileNumber.match(mobileRegex)) {
      setPhoneValidation(false);
    }
    if ((newSubmission && email === "" && mobileNumber === "")) {
      setEmailValidation(false);
      setPhoneValidation(false);
    } else if (message === "") {
      setMessageValidation(false);
    } else {
      setIsLoading(true);
      const messageObj = {
        msgContent: message,
        uploadIP: await publicIp.v4().toString(),
        uploadEmail: email,
      }
      dispatch(newSubmission ? homeActions.saveMessage(messageObj)
      : homeActions.calculateResult(message)).then(() => {
        Router.push({
          pathname: '/confirmation',
          query: { newSubmission: newSubmission },
        }).then(() => {
          setIsLoading(false);
        });
      });
    }
  }, [dispatch, newSubmission, email, mobileNumber, message]);

  const outerClasses = classNames(
    'hero section center-content',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'hero-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  if (isLoading) {
    return (
        <section
            {...props}
            className={outerClasses}
        >
          <div className="container-sm">
            <div className={innerClasses}>
              <div className="hero-content" style={{ color: "white" }}>
                <Loader
                  type="TailSpin"
                  color="white"
                  height={80}
                  width={80}
                />
                <p className="mt-32">Your message is being processed...</p>
              </div>
            </div>
          </div>
        </section>
    )
  }

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
              A world free of fake <span className="text-color-primary">messages</span>
            </h1>
            <div className="container-xs">
              <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                No Fakes application is a robust implementation that helps you identify fake messages through state-of-the-art NLP techniques
              </p>
              <div className="mt-32 mb-32 reveal-from-bottom" data-reveal-delay="400">
                <div className="mb-16">
                  <Checkbox
                    onChange={(event) => newSubmissionChecked(event)}
                  >
                    New Submission
                  </Checkbox>
                </div>
                {newSubmission ?
                    <div>
                      <div className="mt-32 mb-16 info-fields">
                        <div className="ta-l">
                          <FormLabel>Email</FormLabel>
                          <Input
                              placeholder="Enter your email"
                              type="email"
                              value={email}
                              onChange={emailHandler}
                          />
                          {emailValidation === false && email !== "" && !emailRegex.test(email.toLowerCase()) ?
                              <FormHint status="error" submission>
                                Please enter a valid email.
                              </FormHint> : <div />
                          }
                        </div>
                        <div className="or-separator">
                          or
                        </div>
                        <div className="ta-l">
                          <FormLabel>Mobile Number</FormLabel>
                          <Input
                              placeholder="Enter your mobile number"
                              type="text"
                              value={mobileNumber}
                              onChange={mobileHandler}
                          />
                          {phoneValidation === false && mobileNumber !== "" && !mobileNumber.match(mobileRegex) ?
                              <FormHint status="error" submission>
                                Please enter a valid mobile number.
                              </FormHint> : <div />
                          }
                        </div>
                      </div>

                      {emailValidation === false && email === ""
                      && phoneValidation === false && mobileNumber === "" ?
                          <FormHint status="error" className="mt-0" submission>
                            Please enter email or phone number.
                          </FormHint> : <div />
                      }
                    </div> : <div />}
                <div className="mt-32 mb-32">
                  <Input
                    placeholder="Please enter message"
                    type="textarea"
                    rows={5}
                    multiline="true"
                    value={message}
                    onChange={messageHandler}
                  />
                  {messageValidation === false && message === "" ?
                      <FormHint status="error" submission>Please enter message.</FormHint> : <div />
                  }
                </div>
                <div className="mt-32">
                  <ButtonGroup>
                    <Button tag="a" color="primary" wideMobile onClick={submitHandler}>
                      {newSubmission ? "SUBMIT" : "CHECK"}
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;