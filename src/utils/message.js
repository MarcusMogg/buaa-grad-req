import { Message } from "element-ui"

export function ERR(message) {
    Message({
        showClose: true,
        message: message,
        type: 'error'
    });
}