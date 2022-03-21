import { keyframes } from "@emotion/react";
const faqAnim = keyframes`
from {
    opacity: 0;
    transform: translateY(20%);
}
to {
    opacity: 1;
    transform: translateY(0%);
}
`;

const faqTwostyles = {
  section: {mx:"10%",
    pb: ["72px", null, null, null, "96px", null, "148px"],
    pt: ["32px", null, null, null, "72px"],
  },
  sectionTitle: {
    mb: ["0", null, null, null, "32px"],
    textAlign: "center",
    p: {
      color: "#d7354a",
      fontSize: "16px",
    },
    h3: {
      color: "#0F2137",
      letterSpacing: "-0.5px",
      fontSize: "24px",
      fontWeight: 500,
    },
  },
  item: {
    display: "flex",
    flexWrap: "wrap",
    borderBottom: "1px solid #E5E5E5",
    px: ["16px", "32px"],
    py: "32px",
    cursor: "pointer",
    transition: "all 500ms ease",
    position: "relative",
    "&.active": {
      borderColor: "#0F2137",
    },
    h3: {
      flex: ["0 0 100%", null, null, null, "0 0 50%"],
      color: "#0F2137",
      fontSize: ["16px", null, null, "16px", null, "16px"],
      fontWeight: 500,
      letterSpacing: "-0.5px",
      position: "relative",
      pl: ["0", null, null, null, "32px"],
      lineHeight: 1.67,
      whiteSpace: ["normal", null, null, null, "pre-line"],
      mb: ["8px", null, null, null, "0"],
      span: {
        position: ["relative", null, null, null, "absolute"],
        top: 0,
        left: 0,
        mr: ["8px", null, null, null, "0"],
      },
    },
    p: {
      flex: ["0 0 100%", null, null, null, "0 0 50%"],
      color: "#343D48",
      fontSize: ["16px", null, null, "16px"],
      lineHeight: [1.87, 2],
      animation: `${faqAnim} .8s linear`,
    },
  },
  buttonWrap: {
    textAlign: "center",
    mt: "32px",
    a: {
      display: "inline-flex",
      backgroundColor: "#ECF2F7",
      borderRadius: "6px",
      color: "#738295",
      fontSize: "16px",
      fontWeight: 700,
      padding: "8px 24px",
      transition: "all 500ms ease",
      "&:hover": {
        backgroundColor: "#4F96FF",
        color: "#fff",
      },
    },
  },
  icon: {
    position: "absolute",
    top: "48px",
    right: 0,
    svg: {
      fontSize: "24px",
      color: "#B1B8C0",
    },
  },
};

export default faqTwostyles;