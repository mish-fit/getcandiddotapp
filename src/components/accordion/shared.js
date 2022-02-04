/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import { motion } from 'framer-motion';

export const AccordionButton = ({ children, ...rest }) => (
  <div
    css={{
      display: 'flex',
      alignItems: 'center',
      letterSpacing: '-0.2px',
      cursor: 'pointer',
      fontSize: '16px',
      lineHeight: 1.5,
      fontWeight: '500',
      border: 'none',
      paddingTop: '15px',
      paddingBottom: '15px',
      paddingLeft: '20px',
      paddingRight: '30px',
      position: 'relative',
      color: '#0F2137',
      '@media(min-width: 768px)': {
        paddingLeft: '35px',
        paddingRight: '35px',
        paddingTop: '20px',
        paddingBottom: '20px',
        fontSize: '16px',
      },

      ':focus': {
        outline: 'none',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
      },
      span: {
        position: 'absolute',
        top: '50%',
        right: '20px',
        transform: 'translateY(-50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        color: '#fff',
        '@media(min-width: 768px)': {
          right: '30px',
        },
        img: {
          width: '12px',
          '@media(min-width: 768px)': {
            width: 'auto',
          },
        },
      },
    }}
    {...rest}
  >
    {children}
  </div>
);

const variants = {
  open: {
    // maxHeight: 200,
    height: 'auto',
    marginBottom: 25,
    marginTop: 6,
  },
  closed: { height: 0, marginTop: 0, marginBottom: 0 },
};
export function AccordionContents({ isOpen, ...props }) {
  return (
    <motion.div
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      variants={variants}
      css={{
        overflowY: 'hidden',
        fontSize: 15,
        padding: '0 20px',
        lineHeight: 2.13,
        color: '#343D48',
        '@media(min-width: 768px)': {
          padding: '0 35px',
        },
      }}
      {...props}
    />
  );
}

export const AccordionItem = ({ isOpen, children, ...rest }) => (
  <div
    css={{
      borderRadius: 10,
      marginBottom: 20,
      backgroundColor: `${isOpen ? '#ffffff' : '#F6F8FB'}`,
      boxShadow: `${isOpen ? '0px 9px 30px rgba(69, 88, 157, 0.08)' : 'none'}`,
      padding: 0,
      overflow: 'hidden',
    }}
    {...rest}
  >
    {children}
  </div>
);

export const preventClose = (state, changes) =>
  changes.type === 'closing' && state.openIndexes.length < 2
    ? { ...changes, openIndexes: state.openIndexes }
    : changes;

export const single = (state, changes) =>
  changes.type === 'opening'
    ? { ...changes, openIndexes: changes.openIndexes.slice(-1) }
    : changes;

export const combineReducers = (...reducers) => (state, changes) =>
  reducers.reduce((acc, reducer) => reducer(state, acc), changes);
