
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export const ToastiSuccess = (message: string) => {

    // const theme = useTheme();

    Toastify({
        text: message,
        duration: 8000,
        // destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        // close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        //stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #742574, #4c8435)",
          fontWeight: "500"
        },
    }).showToast();
  };