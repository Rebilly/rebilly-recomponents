import Vue from 'vue';

/**
 * Simple directive to add a tooltip
 */
const directive = {
    bind(el, {value}) {
        if (value.text) {
            const tooltip = document.createElement('div');
            const tooltipArrow = document.createElement('div');
            const offset = value.offset || 8;
            const boundaryLeft = value.boundaryLeft || 0;
            const boundaryTop = value.boundaryTop || 0;
            tooltip.classList.add('tooltip');
            tooltipArrow.classList.add('tooltip-arrow');
            tooltip.innerText = value.text;
            el.classList.add('position-relative');

            const tooltipOutOfViewPort = (elToCheck, tooltipEl) => {
                const out = {};
                out.top = tooltip.style.top.replace('px', '') < boundaryTop;
                out.left = tooltip.style.left.replace('px', '') < boundaryLeft;
                out.right = (elToCheck.right + (tooltipEl.width / 2))
                    > (window.innerWidth || document.documentElement.clientWidth);
                return out;
            };

            el.vTooltipEnter = () => {
                document.body.appendChild(tooltip);
                tooltip.appendChild(tooltipArrow);
                const elRect = el.getBoundingClientRect();
                const elRectTopScroll = elRect.top + window.scrollY;
                const tooltipRect = tooltip.getBoundingClientRect();

                // Initial Positioning
                tooltip.style.left = `${(elRect.left + (elRect.width / 2)) - (tooltipRect.width / 2)}px`;
                tooltip.style.top = `${elRectTopScroll - (tooltipRect.height + offset)}px`;

                // Calculating if tooltip is outside viewport
                const isOut = tooltipOutOfViewPort(elRect, tooltipRect);

                tooltip.style.opacity = '1';

                switch (value.position) {
                    case 'left':
                        tooltip.classList.add('tooltip-left');
                        tooltip.style.left = `${elRect.left - tooltipRect.width - offset}px`;
                        tooltip.style.top = `${(elRectTopScroll) - ((tooltipRect.height / 2) - (elRect.height / 2))}px`;
                        break;
                    case 'right':
                        tooltip.classList.add('tooltip-right');
                        tooltip.style.left = `${(elRect.right + offset)}px`;
                        tooltip.style.top = `${(elRectTopScroll) - ((tooltipRect.height / 2) - (elRect.height / 2))}px`;
                        break;
                    case 'bottom':
                        tooltip.classList.add('tooltip-bottom');
                        tooltip.style.top = `${elRectTopScroll + tooltipRect.height + offset}px`;
                        break;
                    case undefined:
                        if (isOut.right) {
                            tooltip.style.left = `${(elRect.left + elRect.width) - (tooltipRect.width)}px`;
                            tooltip.classList.add('tooltip-out-right');
                        } else if (isOut.left) {
                            tooltip.style.left = `${elRect.left}px`;
                            tooltip.classList.add('tooltip-out-left');
                        }
                        // Checking if tooltip is outside viewport (top)
                        if (isOut.top) {
                            tooltip.style.top = `${elRectTopScroll + tooltipRect.height + offset}px`;
                            tooltip.classList.add('tooltip-out-top');
                        }
                        /*
                        Position the tooltip arrow in the center of the parent element if
                        tooltip is outside viewport
                        */
                        if (tooltip.classList.contains('tooltip-out-right')) {
                            tooltipArrow.style.left = `${tooltipRect.width - (elRect.width / 2)}px`;
                        } else if (tooltip.classList.contains('tooltip-out-left')) {
                            tooltipArrow.style.left = `${elRect.width / 2}px`;
                        } else {
                            tooltipArrow.style.left = `${tooltipRect.width / 2}px`;
                        }
                        break;
                    default:
                        // Position already calculated in the initial positioning
                        break;
                }
            };

            el.vTooltipLeave = () => {
                tooltip.style.opacity = '0';
                tooltip.style.left = '0';
                tooltip.style.top = '0';
                tooltip.className = 'tooltip';
                tooltip.remove();
            };

            el.addEventListener('mouseenter', el.vTooltipEnter, false);
            el.addEventListener('mouseleave', el.vTooltipLeave, false);
        }
    },
    unbind(el) {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
        el.removeEventListener('mouseenter', el.vTooltipEnter);
        el.removeEventListener('mouseleave', el.vTooltipLeave);
        el.vTooltipEnter = null;
        el.vTooltipLeave = null;
    },
};

Vue.directive('tooltip', directive);
