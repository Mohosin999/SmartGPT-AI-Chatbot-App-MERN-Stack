import React from "react";
import PropTypes from "prop-types";
import { ImSpinner9 } from "react-icons/im";

/**
 * Loader Component
 * ----------------
 * Displays a full-screen overlay loader with a spinning icon and optional title.
 * Typically used while waiting for asynchronous operations like API calls or
 * AI-generated content.
 *
 * Props:
 * @param {string} title - The text to display below the spinner. Defaults to "Loading..."
 *
 * Usage Example:
 * <Loader title="Generating full response..." />
 */
const Loader = ({ title = "Loading..." }) => {
  return (
    <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-3">
        <ImSpinner9 className="animate-spin text-white text-4xl" />
        <span className="text-white text-lg">{title}</span>
      </div>
    </div>
  );
};

// Runtime prop type checking
Loader.propTypes = {
  title: PropTypes.string,
};

export default Loader;
