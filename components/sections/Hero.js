import React, { useState } from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import Image from '../elements/Image';
import Modal from '../elements/Modal';
import Input from "../elements/Input";
import FormLabel from "../elements/FormLabel";
import Checkbox from "../elements/Checkbox";



const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

const Hero = ({ className, topOuterDivider, bottomOuterDivider, topDivider, bottomDivider, hasBgColor, invertColor,
                ...props }) => {

  const [newSubmission, setNewSubmission] = useState(false);

  const newSubmissionChecked = (event) => {
    console.log("checked: " + event.target.checked);
    setNewSubmission(event.target.checked);
  }

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
                <div className="mb-32">
                  <Input
                    placeholder="Please enter message"
                    type="textarea"
                    rows="5"
                    multiline
                  />
                </div>
                <ButtonGroup>
                  <Button tag="a" color="primary" wideMobile>
                    {newSubmission ? "SUBMIT" : "CHECK"}
                  </Button>
                </ButtonGroup>
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