const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
  },
  content: {
    justify: "space-between",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: "25px",
    boxShadow: "0 0 10px 5px var(--gray)",
    padding: "20px",
    maxWidth: "600px",
    width: "100%",
    height: "fit-content",
    backgroundColor: "var(--dutch-white)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },
  button: {
    margin: "0 10px",
  },
};

export default modalStyles;
