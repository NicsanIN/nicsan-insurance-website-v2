/**
 * Touch device detection and handlers for insurance cards
 */

export const useTouchSupport = () => {
  const isTouchDevice = () => {
    return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  };

  const createTouchHandlers = (
    isExpanded: boolean,
    setIsExpanded: (expanded: boolean) => void
  ) => {
    const isTouch = isTouchDevice();

    return {
      isTouchDevice: isTouch,
      handleTouchToggle: () => {
        if (isTouch) {
          setIsExpanded(!isExpanded);
        }
      },
      handleMouseEvents: {
        onMouseEnter: () => !isTouch && setIsExpanded(true),
        onMouseLeave: () => !isTouch && setIsExpanded(false),
      },
      touchExpandedClass: isTouch && isExpanded ? 'touch-expanded' : '',
    };
  };

  return {
    isTouchDevice,
    createTouchHandlers,
  };
};
