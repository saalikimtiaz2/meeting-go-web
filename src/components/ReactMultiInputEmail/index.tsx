/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
// src/components/MultipleEmailInput.tsx

// import 'react-multi-email/style.css';

import React from 'react';
import { MdClose } from 'react-icons/md';
import { isEmail, ReactMultiEmail } from 'react-multi-email';

interface MultipleEmailInputProps {
  emails: string[];
  setEmails: (emails: string[]) => void;
}

const MultipleEmailInput: React.FC<MultipleEmailInputProps> = ({ emails, setEmails }) => {
  return (
    <div>
      <ReactMultiEmail
        emails={emails}
        onChange={setEmails}
        validateEmail={(email) => isEmail(email)}
        getLabel={(email, index, removeEmail) => (
          <div
            data-tag
            key={index}
            className="flex items-center gap-x-4 p-1 rounded-md bg-gray-100 dark:bg-gray-600 w-max text-sm text-gray-700 dark:text-gray-300 mr-2 mb-2"
          >
            {email}
            <button data-tag-handle onClick={() => removeEmail(index)} type="button">
              <MdClose />
            </button>
          </div>
        )}
      />
    </div>
  );
};

export default MultipleEmailInput;
