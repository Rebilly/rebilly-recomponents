// created() {
//     this.wrapper = _.debounce(this.checkThisContext);
//     this.wrapper(1);
//     this.wrapper(2);
//     this.wrapper(3);
//     setTimeout(this.wrapper, 1000);
// },
// methods: {
//     checkThisContext(n) {
//         console.log('checkThisContext', n, this);
//     },
// },

export default function debounce(func, delay) {
  let timeout;
  let called = false;

  return function wrapper(...args) {
    const handler = () => {
      called = true;
      func.apply(this, [...args]);
    };
    const timer = () => {
      timeout = null;
      if (!called) {
        handler();
      }
    };

    // delayed or first run
    if (!timeout) {
      handler();
    } else {
      called = false;
    }
    clearTimeout(timeout);
    timeout = setTimeout(timer, delay);
  };
}
