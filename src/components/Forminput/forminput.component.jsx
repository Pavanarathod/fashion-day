import "./forminput.scss";

const FormInput = ({ handleChange, label, ...otherProps }) => {
  return (
    <div className="group">
      <input type="form-input" onChange={handleChange} {...otherProps} />
      {label ? (
        <label className={`${otherProps.value.length ? "shrink" : ""}`}>
          {label}
        </label>
      ) : null}
    </div>
  );
};

export default FormInput;
