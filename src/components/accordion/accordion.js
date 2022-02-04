import React, { Fragment } from 'react';
import { Image } from 'theme-ui';
import { BaseAccordion } from './base-accordion';
import accordionIconClose from 'assets/faq-one-plus.svg';
import accordionIconOpen from 'assets/faq-one-minus.svg';
import {
  AccordionButton,
  AccordionItem,
  AccordionContents,
  single,
  preventClose,
  combineReducers,
} from './shared';

export default function Accordion({ items, ...props }) {
  const openIcon = <Image src={accordionIconOpen} alt="open icon" />;
  const closeIcon = <Image src={accordionIconClose} alt="close icon" />;
  return (
    <BaseAccordion
      stateReducer={combineReducers(single, preventClose)}
      {...props}
    >
      {({ openIndexes, handleItemClick }) => (
        <Fragment>
          {items.map((item, index) => (
            <AccordionItem
              key={item.title}
              isOpen={openIndexes.includes(index)}
            >
              <AccordionButton onClick={() => handleItemClick(index)}>
                <span>
                  {openIndexes.includes(index) ? openIcon : closeIcon}
                </span>
                {item.title}
              </AccordionButton>
              <AccordionContents isOpen={openIndexes.includes(index)}>
                {item.contents}
              </AccordionContents>
            </AccordionItem>
          ))}
        </Fragment>
      )}
    </BaseAccordion>
  );
}
