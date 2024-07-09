import { ModalState } from "@/redux/modal/modalSlice";
import { isEmpty } from "lodash";

/**
 * This will get the value of the provided key
 * from the document.cookie
 * @param key string
 * @returns value of string
 */
export const parseCookie = (key: string) => {
    const attributes = typeof window !== 'undefined'
        && document.cookie.split(`; ${key}=`);

    if (attributes && attributes.length === 2) {
        const value = attributes
            ?.pop()
            ?.split(';')
            ?.shift();

        return value
    }
}

/**
 * This util will return a masked address
 * @param address string
 * @returns string
 */
export const getMaskedAddress = (address: string, index = 6) => {
    return `${address.slice(0, index)}...${address.slice(-index)}`
}
