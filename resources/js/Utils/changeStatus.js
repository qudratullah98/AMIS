import axios from "axios";

export const changeStatus = async (itemId, model) => {
    const response = await axios.post(route("ChangeStatus"), {
        id: itemId,
        model: model,
    });

    return response.data;
};