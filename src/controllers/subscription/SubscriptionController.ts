import axiosAuth from "@/src/lib/axios";
import DefaultSubscription from "@/src/models/DefaultSubscription.model";
import ResponseModel from "@/src/models/Response.model";
import Subscription from "@/src/models/Subscription.model";

const SubscriptionController = {
    //  ajouter unz souscription
    addSubscription: async (subscription: Subscription): Promise<ResponseModel<undefined>> => {
        try {
            const response = await axiosAuth.post<ResponseModel<undefined>>('/subscriptions/add', subscription);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // détail d'une souscription
    getDetailSubscription: async (subscription_id: number): Promise<ResponseModel<Subscription>> => {
        try {
            const response = await axiosAuth.get<ResponseModel<Subscription>>(`/subscriptions/subscription/${subscription_id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getDefaultSubscription: async (): Promise<ResponseModel<DefaultSubscription[]>> => {
        try {
            const response = await axiosAuth.get<ResponseModel<DefaultSubscription[]>>('/subscriptions/default_subscriptions');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // toute les souscriptions  d'un utilisateur
    getUserSubscriptions: async (user_id: number): Promise<ResponseModel<Subscription[]>> => {
        try {
            const response = await axiosAuth.get<ResponseModel<Subscription[]>>(`/subscriptions/${user_id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // les souscriptions expirés d'un utilisateur
    getExpSubscriptions: async (user_id: number): Promise<ResponseModel<Subscription[]>> => {
        try {
            const response = await axiosAuth.get<ResponseModel<Subscription[]>>(`/subscriptions/expired/${user_id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // modifier une souscription
    updateSubscription: async (subscription_id: number, reminder: number): Promise<ResponseModel<undefined>> => {
        try {
            const response = await axiosAuth.put<ResponseModel<undefined>>(`/subscriptions/edit/${subscription_id}`, reminder);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    
    // supprimer une souscription
    deleteOneSubscription: async (subscription_id: number): Promise<ResponseModel<undefined>> => {
        try {
            const response = await axiosAuth.delete<ResponseModel<undefined>>(`/subscriptions/delete/${subscription_id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    } 
}

export default SubscriptionController;