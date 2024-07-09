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

/**
 * NOTE: Specific for Share Modal only!!
 * All routing must be done via nextjs pages
 * 
 * @param pathId This is the id from the url path
 * @param id This is the id passed from ModalContainer
 * @returns ModalState object
 */
export const getModalFromPath = (pathId: string = "", id: string = ""): ModalState => {
    const modals: ModalState[] = [
        {
            isModalOpen: true, // default
            props: { id: "Share RNS", fullHeight: true, fullWidth: true }
        },
    ]

    const pattern = new RegExp(
        /(?:modal-)/g
    );

    const modalItem: ModalState = {
        isModalOpen: false,
    }

    if (isEmpty(id)) {
        const match = pathId.toLowerCase().match(pattern)
        const modal = modals.find((modal: ModalState) => {
            return (modal.props?.id === pathId.split(pattern)[1])
        })

        modalItem.isModalOpen = !isEmpty(match)
        modalItem.props = modal?.props
    }

    return modalItem
}
