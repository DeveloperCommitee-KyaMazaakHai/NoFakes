import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import Input from "../elements/Input";
import Checkbox from "../elements/Checkbox";
import FormHint from "../elements/FormHint";
import * as homeActions from "../../store/actions/Home";

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

const Hero = ({ className, topOuterDivider, bottomOuterDivider, topDivider, bottomDivider, hasBgColor, invertColor,
                ...props }) => {

  const [newSubmission, setNewSubmission] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const [emailValidation, setEmailValidation] = useState(true);
  const [phoneValidation, setPhoneValidation] = useState(true);
  const [messageValidation, setMessageValidation] = useState(true);

  const dispatch = new useDispatch();

  const newSubmissionChecked = (event) => {
    setNewSubmission(event.target.checked);
  }

  const emailHandler = (event) => {
    setEmail(event.target.value);
  }
  const phoneHandler = (event) => {
    setPhoneNumber(event.target.value);
  }

  const messageHandler = (event) => {
    setMessage(event.target.value);
  }

  const submitHandler = useCallback(async () => {
    if (newSubmission && email === "" && phoneNumber === "") {
      setEmailValidation(false);
      setPhoneValidation(false);
    } else if (message === "") {
      setMessageValidation(false);
    } else {
      const messageObj = {
        msgContent: message,
        uploadIP: "127.0.0.21",
        uploadEmail: email,
      }
      dispatch(homeActions.saveMessage(messageObj));
    }
  }, [dispatch, newSubmission, email, phoneNumber, message]);

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
                        <div>
                          <Input
                              placeholder="Enter your email"
                              type="email"
                              value={email}
                              onChange={emailHandler}
                          />
                        </div>
                        <div className="or-separator">
                          or
                        </div>
                        <div>
                          <Input
                              placeholder="Enter your phone number"
                              type="text"
                              value={phoneNumber}
                              onChange={phoneHandler}
                          />
                        </div>
                      </div>
                      {emailValidation === false && email === "" && phoneValidation === false && phoneNumber === "" ?
                          <FormHint status="error" className="mt-0" submission>Please enter email or phone number.</FormHint> : <div />
                      }
                    </div> : <div />}
                <div className="mt-32 mb-32">
                  <Input
                    placeholder="Please enter message"
                    type="textarea"
                    rows="5"
                    multiline
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