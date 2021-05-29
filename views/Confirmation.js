import React from 'react';
import { useRouter } from 'next/router'
import { useSelector } from "react-redux";
import classNames from 'classnames';

const ConfirmationView = ({ className, ...props }) => {
    const router = useRouter();
    const newSubmission = router.query.newSubmission;
    const response = useSelector((state) =>
        newSubmission === "true" ? state.home.messageSubmitInfo : state.home.calculateResultInfo);
    const outerClasses = classNames(
        'hero section center-content',
        className
    );

    const innerClasses = classNames(
        'hero-inner section-inner',
    );

    const getColor = () => {
        if (response <= 40) {
            return "green";
        } else if (response > 40 && response <= 70 ) {
            return "orange";
        } else if (response > 70) {
            return "red";
        }
    }

    return (
        <section
            {...props}
            className={outerClasses}
        >
            <div className="container-sm">
                <div className={innerClasses}>
                    <div className="hero-content">
                        {response != null ?
                            <div className="container-xs" style={{ color: "white" }}>
                                <div style={{ height: "32px", width: "100%", backgroundColor: "#e0e0de",
                                    borderRadius: "24px" }}>
                                    <div style={{ height: '100%',
                                        width: `${response}%`,
                                        backgroundColor: getColor(),
                                        borderRadius: 'inherit',
                                        textAlign: 'right' }}>
                                    <span style={{ padding: 5,
                                        paddingRight: 20,
                                        color: "#e0e0de",
                                        fontWeight: 'bold', fontSize: "16px" }}
                                    >
                                        {`${response}%`}
                                    </span>
                                    </div>
                                </div>
                                <p className="mt-32">
                                    The message is {`${response}%`} fake.
                                </p>
                            </div> : <div />
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ConfirmationView;