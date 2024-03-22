import React from "react";
import { TransformImage } from "../../lib/features";
import { FileOpen } from "@mui/icons-material";

const RenderAttachment = ({ file, url }) => {
  switch (file) {
    case "video":
      return <video src={url} controls preload="none" width={"200px"} />;

    case "image":
      return (
        <img
          src={TransformImage(url, 200)}
          alt="attachment"
          width={"200px"}
          height={"150px"}
          style={{
            objectFit: "contain",
          }}
        />
      );

    case "audio":
      return <audio src={url} controls preload="none" />;

    default:
      return <FileOpen />;
  }
};

export default RenderAttachment;
