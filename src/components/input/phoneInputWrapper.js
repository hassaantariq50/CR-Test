import PhoneInput from "react-phone-number-input";

const PhoneInputWrapper = (props) => {
  const { onChange, name, placeholder, defaultCountry, error, value } = props;

  const handleChange = (val) => {
    if (val === undefined || val === null) {
      onChange({ target: { name, value: "" } });
    } else if (typeof val === "string") {
      onChange({ target: { name, value: val } });
    }
  };

  return (
    <>
      <PhoneInput
        className="phone-input-div"
        style={{
          ...props.style,
          border: error ? "1px solid #d1d1d1" : "1px solid #d1d1d1",
        }}
        autoComplete="new-password"
        placeholder={placeholder}
        defaultCountry={defaultCountry}
        value={value}
        onChange={handleChange}
        disabled={props.disabled}
      />
      <div style={{ color: "#FF4752", position: "absolute" }}>{error}</div>
    </>
  );
};

PhoneInputWrapper.defaultProps = {
  placeholder: "Phone",
  defaultCountry: "PK",
  onChange: () => {},
};

export default PhoneInputWrapper;
