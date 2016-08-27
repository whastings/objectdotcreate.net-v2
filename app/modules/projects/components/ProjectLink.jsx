import React from 'react';

const CODE_ICON = (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 32 32"
  >
    <path fill="currentColor" d="M18 23l3 3 10-10-10-10-3 3 7 7z"></path>
    <path fill="currentColor" d="M14 9l-3-3-10 10 10 10 3-3-7-7z"></path>
  </svg>
);

const OPEN_ICON = (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path fill="currentColor" d="M4 1h7q0.414 0 0.707 0.293t0.293 0.707-0.293 0.707-0.707 0.293h-7q-0.414 0-0.707 0.293t-0.293 0.707v16q0 0.414 0.293 0.707t0.707 0.293h16q0.414 0 0.707-0.293t0.293-0.707v-7q0-0.414 0.293-0.707t0.707-0.293 0.707 0.293 0.293 0.707v7q0 1.242-0.879 2.121t-2.121 0.879h-16q-1.242 0-2.121-0.879t-0.879-2.121v-16q0-1.242 0.879-2.121t2.121-0.879zM16 1h6q0.414 0 0.707 0.293t0.293 0.707v6q0 0.414-0.293 0.707t-0.707 0.293-0.707-0.293-0.293-0.707v-3.586l-8.297 8.297q-0.289 0.289-0.703 0.289-0.43 0-0.715-0.285t-0.285-0.715q0-0.414 0.289-0.703l8.297-8.297h-3.586q-0.414 0-0.707-0.293t-0.293-0.707 0.293-0.707 0.707-0.293z"></path>
  </svg>
);

export default function ProjectLink({href, projectName, type = 'code'}) {
  return (
    <a className="project-link" href={href} target="_blank">
      {(type === 'code') ? CODE_ICON : OPEN_ICON}
      <span className="sr-only">
        {(type === 'code') ? `Open code for ${projectName}` : `Open ${projectName}`}
      </span>
    </a>
  );
}
