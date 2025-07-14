import { DataGrid, GridColDef, GridRenderCellParams, GridRowClassNameParams } from "@mui/x-data-grid";
import { ExercisesTableProps, ExerciseWithWorkout, ExerciseWithWorkoutAndRounds } from "../types";
import * as React from "react";
import { buildExerciseRows, handleColumnVisibilityModelChange, getExerciseRowId } from "../utils";

/**
 * Renders a MUI DataGrid for a list of exercises, including external links and the main workout name.
 * @param exercises - The list of exercises to display, each with its workout name
 * @author GitHub Copilot
 */
export default function ExercisesTable({ exercises }: ExercisesTableProps) {
	const columns: GridColDef<ExerciseWithWorkout>[] = [
		{
			field: "workoutName",
			headerName: "Programme",
			flex: 1,
			minWidth: 120,
			hideable: true, // Allow user to show/hide
		},
		{ field: "name", headerName: "Exercice", flex: 1, minWidth: 140 },
		{
			field: "series",
			headerName: "Séries",
			type: "number",
			align: "right",
			headerAlign: "right",
			minWidth: 80,
			renderCell: (params: GridRenderCellParams<ExerciseWithWorkoutAndRounds>) => {
				const series = params.row.series;
				const rounds = params.row.workoutRounds;
				if (typeof series === "number") {
					return <span>{series}</span>;
				}
				if (typeof rounds === "number") {
					return (
						<span>
							{rounds} <span className="text-xs text-gray-500">(tours)</span>
						</span>
					);
				}
				return <span>-</span>;
			},
		},
		{
			field: "repetitionsOrDuration",
			headerName: "Répétitions / Durée",
			flex: 1,
			minWidth: 120,
			align: "right",
			headerAlign: "right",
			renderCell: (params: GridRenderCellParams<ExerciseWithWorkoutAndRounds>) => {
				const rep = params.row.repetitions;
				if (typeof rep === "number" || typeof rep === "string") {
					return <span>{rep}</span>;
				}
				return <span>-</span>;
			},
		},
		{
			field: "rest_seconds",
			headerName: "Repos (s)",
			type: "number",
			align: "right",
			headerAlign: "right",
			minWidth: 100,
		},
		{
			field: "alternative",
			headerName: "Alternative",
			flex: 1,
			minWidth: 120,
			hideable: true, // Allow user to show/hide
		},
		{
			field: "links",
			headerName: "Liens externes",
			flex: 1,
			minWidth: 120,
			align: "center",
			sortable: false,
			renderCell: (params: GridRenderCellParams<ExerciseWithWorkout>) => (
				<div className="flex gap-2 items-center justify-center h-full min-h-[40px]">
					<a
						href={`https://www.youtube.com/results?search_query=${encodeURIComponent(params.row.name)}`}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={`Rechercher ${params.row.name.replace(/'/g, "&apos;")} sur YouTube`}
						className="inline-block text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
							<path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.117C19.228 3.5 12 3.5 12 3.5s-7.228 0-9.391.569A2.994 2.994 0 0 0 .502 6.186C0 8.36 0 12 0 12s0 3.64.502 5.814a2.994 2.994 0 0 0 2.107 2.117C4.772 20.5 12 20.5 12 20.5s7.228 0 9.391-.569a2.994 2.994 0 0 0 2.107-2.117C24 15.64 24 12 24 12s0-3.64-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
						</svg>
					</a>
					<a
						href={`https://www.google.com/search?q=${encodeURIComponent(params.row.name)}`}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={`Rechercher ${params.row.name.replace(/'/g, "&apos;")} sur Google`}
						className="inline-block text-blue-700 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<svg width="22" height="22" viewBox="0 0 48 48" fill="currentColor" aria-hidden="true">
							<path d="M43.6 20.5H42V20H24v8h11.3C34.7 32.1 30.1 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.6 0 5 .9 6.9 2.4l6.6-6.6C34.5 5.5 29.6 3.5 24 3.5 12.4 3.5 3.5 12.4 3.5 24S12.4 44.5 24 44.5c11.1 0 20.5-8.1 20.5-20.5 0-1.4-.1-2.7-.4-4z" />
							<path
								d="M6.3 14.1l6.6 4.8C14.5 16.1 18.9 13 24 13c2.6 0 5 .9 6.9 2.4l6.6-6.6C34.5 5.5 29.6 3.5 24 3.5c-7.2 0-13.4 4.1-16.7 10.6z"
								fill="#EA4335"
							/>
							<path
								d="M24 44.5c5.6 0 10.5-1.9 14.3-5.1l-6.6-5.4C29.9 35.1 27.1 36 24 36c-6.1 0-10.7-3.9-12.5-9.1l-6.7 5.2C7.7 40.1 15.3 44.5 24 44.5z"
								fill="#34A853"
							/>
							<path
								d="M43.6 20.5H42V20H24v8h11.3c-1.2 3.2-4.7 7-11.3 7-6.1 0-11-4.9-11-11s4.9-11 11-11c2.6 0 5 .9 6.9 2.4l6.6-6.6C34.5 5.5 29.6 3.5 24 3.5c-7.2 0-13.4 4.1-16.7 10.6l6.6 4.8C14.5 16.1 18.9 13 24 13c2.6 0 5 .9 6.9 2.4l6.6-6.6C34.5 5.5 29.6 3.5 24 3.5c-7.2 0-13.4 4.1-16.7 10.6z"
								fill="#FBBC05"
							/>
							<path
								d="M24 44.5c5.6 0 10.5-1.9 14.3-5.1l-6.6-5.4C29.9 35.1 27.1 36 24 36c-6.1 0-10.7-3.9-12.5-9.1l-6.7 5.2C7.7 40.1 15.3 44.5 24 44.5z"
								fill="#34A853"
							/>
							<path
								d="M43.6 20.5H42V20H24v8h11.3c-1.2 3.2-4.7 7-11.3 7-6.1 0-11-4.9-11-11s4.9-11 11-11c2.6 0 5 .9 6.9 2.4l6.6-6.6C34.5 5.5 29.6 3.5 24 3.5c-7.2 0-13.4 4.1-16.7 10.6l6.6 4.8C14.5 16.1 18.9 13 24 13c2.6 0 5 .9 6.9 2.4l6.6-6.6C34.5 5.5 29.6 3.5 24 3.5c-7.2 0-13.4 4.1-16.7 10.6z"
								fill="#4285F4"
							/>
						</svg>
					</a>
				</div>
			),
		},
	];

	// Hide columns by default using DataGrid's columnVisibilityModel
	const [columnVisibilityModel, setColumnVisibilityModel] = React.useState<{ [key: string]: boolean }>({
		workoutName: false,
		alternative: false,
	});

	const handleColumnVisibilityModel = handleColumnVisibilityModelChange(setColumnVisibilityModel);

	// When building the rows, inject workoutRounds from the parent workout if not present
	const rows: ExerciseWithWorkoutAndRounds[] = buildExerciseRows(exercises);

	return (
		<div style={{ width: "100%", background: "var(--mui-palette-background-paper)" }}>
			<DataGrid
				rows={rows}
				columns={columns}
				getRowId={getExerciseRowId}
				initialState={{
					pagination: { paginationModel: { pageSize: 20 } },
				}}
				pageSizeOptions={[5, 10, 20, 50, 100]}
				disableRowSelectionOnClick
				columnVisibilityModel={columnVisibilityModel}
				onColumnVisibilityModelChange={handleColumnVisibilityModel}
				getRowClassName={(params: GridRowClassNameParams<ExerciseWithWorkout>) =>
					params.indexRelativeToCurrentPage % 2 === 0 ? "MuiDataGrid-row even-row" : "MuiDataGrid-row odd-row"
				}
			/>
		</div>
	);
}
