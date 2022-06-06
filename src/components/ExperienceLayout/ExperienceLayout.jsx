import classNames from "classnames";
import React from "react";
import styled from "styled-components";

function ExperienceLayout() {
  const sectionClassNames = classNames({
    [`interface-section`]: true,
  });

  const asideTopClassNames = classNames({
    [`interface-aside-top`]: true,
  });

  const asideBottomClassNames = classNames({
    [`interface-aside-bottom`]: true,
  });

  return (
    <Section className={sectionClassNames}>
      <Aside className={asideTopClassNames}></Aside>

      <Aside className={asideBottomClassNames}></Aside>
    </Section>
  );
}

export default ExperienceLayout;

const Section = styled.section`
  position: fixed;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  justify-content: space-between;
  align-items: stretch;
`;

const Aside = styled.aside`
  width: 100%;

  display: flex;
  justify-content: space-between;
`;
