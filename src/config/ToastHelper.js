import { useToast } from 'vue-toast-notification';

const config = {
    position: 'top-right',
    duration: 5000,
}

const ToastHelper = useToast(config)

export default ToastHelper