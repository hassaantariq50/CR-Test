import React from "react";

const FooterWrapper = () => {
  return (
    <footer
      style={{
        height: 66,
        lineHeight: "66px",
        backgroundColor: "#fff",
        boxShadow: "2px -2px 3px rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ marginLeft: 48 }}>
        Copyright <b>Demo ®</b> | {new Date().getFullYear()} All Rights Reserved
      </div>
    </footer>
  );
};

export default FooterWrapper;
