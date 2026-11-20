"use client";

import { useCallback, useEffect, useState } from "react";
import {
    createCrossing,
    deleteCrossing,
    getCrossings,
    updateCrossing,
} from "../services/crossingsService";

export function useCrossings(){
    const [crossings, setCrossings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadCrossings = useCallback(async (status) => {
        try {
            setLoading(true);
            setError("");

            const data = await getCrossings(status);
            setCrossings(data);
        } catch (err){
            setError(err.message);
        } finally{
            setLoading(false);
        }
},   []);

    useEffect(() => {
        loadCrossings();   
    }, [loadCrossings]);

    async function addCrossing(data) {
        const createdCrossing = await createCrossing(data);
        await loadCrossings();
        return createdCrossing;
    }

    async function editCrossing(id, data) {
        const updatedCrossing = await updateCrossing(id, data);
        await loadCrossings();
        return updatedCrossing;
    }

    async function removeCrossing(id) {
        await deleteCrossing(id);
        await loadCrossings();
    }

    return {
        crossings,
        loading,
        error,
        loadCrossings,
        addCrossing,
        editCrossing,
        removeCrossing
    }
}