import React from "react";
import PageHeader from "../PageHeader";

const PageHeaderWrapper = ({
  title,
  subtitle,
  parent,
  child,
  subchild,
  id,
  type
}) => (
  <>
    <PageHeader
      title={title}
      subtitle={subtitle}
      parent={parent}
      child={child}
      subchild={subchild}
      id={id}
      type={type}
    />
  </>
);

export default PageHeaderWrapper;
