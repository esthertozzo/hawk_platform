"use client";

import { useEffect, useState } from "react";
import {
  getSummaryReport,
  getTimesReport,
  getCrossingsReport,
} from "../services/reportsService";

function createInitialReports() {
  return {
    summary: { data: null, error: "" },
    times: { data: null, error: "" },
    crossings: { data: null, error: "" },
  };
}

export function useDashboard() {
  const [reports, setReports] = useState(createInitialReports);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadReport(name, request) {
      try {
        const data = await request({
          signal: controller.signal,
        });

        if (!controller.signal.aborted) {
          setReports((current) => ({
            ...current,
            [name]: { data, error: "" },
          }));
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setReports((current) => ({
            ...current,
            [name]: {
              data: null,
              error: err.message || "Não foi possível carregar o relatório.",
            },
          }));
        }
      }
    }

    async function loadDashboard() {
      setLoading(true);
      setReports(createInitialReports());

      await Promise.all([
        loadReport("summary", getSummaryReport),
        loadReport("times", getTimesReport),
        loadReport("crossings", getCrossingsReport),
      ]);

      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }

    loadDashboard();

    return () => controller.abort();
  }, [refreshKey]);

  function reloadDashboard() {
    setRefreshKey((current) => current + 1);
  }

  return {
    summary: reports.summary,
    times: reports.times,
    crossings: reports.crossings,
    loading,
    reloadDashboard,
  };
}