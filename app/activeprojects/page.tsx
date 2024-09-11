"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Nav from "../components/Nav";
import Projectdatagrid from "../components/Projectdatagrid";
import Topbatchfilter from "../components/Topbatchfilter";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ProjectDataWithFilter,
  ActiveProjectRow,
  ACTIVEPROJECT_CONFIG,
  ValueRange,
  Record,
  Column,
  PROJECT_TAB_CONFIG,
  QTYPE_CONFIG,
  Topprojectfilter,
  WORKFLOWFILTER_CONFIG,
  ChangeHistory,
  Cell
} from "../common/constants";
import { titleToNumber, getRowNumber, getOptions, formatDate, convertActiveProjectRowToArrayExcludeId} from "../common/utils";
import loading from "../../public/loading.gif";
import Addprojectrow from "../components/Addprojectrow";
import { CSVLink } from "react-csv";
import { IoCloudDownloadOutline } from "react-icons/io5";

const Activeprojects = () => {
  const [dataWithFilter, setDataWithFilter] = useState(
    {} as ProjectDataWithFilter
  );
  const [selectedCheckbox, setselectedCheckbox] = useState([] as number[]);
  const [offset, setOffset] = useState(0);
  const [saveValues, setSaveValues] = useState(false);
  const [updates, setUpdates] = useState({} as Record);
  const [csvData, setCsvData] = useState([] as string[][]);
  const [topprojectfilterconfig, setTopprojectfilterconfig] = useState([
    PROJECT_TAB_CONFIG[0],
    WORKFLOWFILTER_CONFIG,
    QTYPE_CONFIG,
  ]);
  const [topprojectfilter, setTopprojectfilter] = useState({
    baseproject: "",
    workflow: "",
    qtype: "",
  });
  const [clearfilter, setClearfilter] = useState(false);
  const updatefilterconfig = (rows: ActiveProjectRow[]) => {
    const [projectconfig, workflowconfig, qtypeconfig] = topprojectfilterconfig;
    const projectoptions = getOptions(rows.map(row=>row.project.value||''));
    const workflowoptions = getOptions(rows.map(row=>row.workflow.value||''));
    const qtypeoptions = getOptions(rows.map(row=>row.qType.value||''));
    projectconfig.options = projectoptions;
    workflowconfig.options = workflowoptions
    qtypeconfig.options = qtypeoptions;
    setTopprojectfilterconfig([projectconfig, workflowconfig, qtypeconfig]);
  };
  const convertToChangeHistory = (updates: Record) => {
    const changes = {} as ChangeHistory;
    Object.values(updates).forEach((update) => {
      console.log("update", update.column?.rowNum);
      if (update.column && update.column.rowNum) {
        if (changes[update.column?.rowNum]) {
          const message = `Row: ${update.column.rowNum-6} Field: ${
            update.column.label
          }, updated: ${formatDate(new Date(Date.now()))}`;
          changes[update.column?.rowNum] =
            changes[update.column?.rowNum] + " " + message;
        } else {
          const message = `Row: ${update.column.rowNum-6} Field: ${
            update.column.label
          }, updated: ${formatDate(new Date(Date.now()))}`;
          changes[update.column?.rowNum] = message;
        }
      }
    });
    return changes;
  };

  const writeToChangeHistory = (changes: ChangeHistory) => {
    console.log("changes", changes);
    Object.entries(changes).forEach(([key, value]) => {
      const writedata = async () => {
        const req = new Request(`/api/roster?range=ProjectChange!B${key}`);
        const response = await fetch(req, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        });
        return response;
      };
      writedata();
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      const queryParams = "range=Sheet2!B7:AS1132";
      const req = new Request(`/api/roster?${queryParams}`);
      await fetch(req, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          const values = res.data.values;
          const rows = values.map((value: string[]) => {
            return {
              id: `ActiveProject:${
                value[titleToNumber(ACTIVEPROJECT_CONFIG.bugId.columnNum) - 2]
              }-${value[0]}`,
              bugId: {
                ...ACTIVEPROJECT_CONFIG.bugId,
                rowNum: getRowNumber(value[0]) + 6,
                value:
                  value[
                    titleToNumber(ACTIVEPROJECT_CONFIG.bugId.columnNum) - 2
                  ],
              },
              project: {
                ...ACTIVEPROJECT_CONFIG.project,
                rowNum: getRowNumber(value[0]) + 6,
                value:
                  value[
                    titleToNumber(ACTIVEPROJECT_CONFIG.project.columnNum) - 2
                  ],
              },
              workflow: {
                ...ACTIVEPROJECT_CONFIG.workflow,
                rowNum: getRowNumber(value[0]) + 6,
                value:
                  value[
                    titleToNumber(ACTIVEPROJECT_CONFIG.workflow.columnNum) - 2
                  ],
              },
              tasksubtype: {
                ...ACTIVEPROJECT_CONFIG.tasksubtype,
                rowNum: getRowNumber(value[0]) + 6,
                value:
                  value[
                    titleToNumber(ACTIVEPROJECT_CONFIG.tasksubtype.columnNum) -
                      2
                  ],
              },
              workspace: {
                ...ACTIVEPROJECT_CONFIG.workspace,
                rowNum: getRowNumber(value[0]) + 6,
                value:
                  value[
                    titleToNumber(ACTIVEPROJECT_CONFIG.workspace.columnNum) - 2
                  ],
              },
              qType: {
                ...ACTIVEPROJECT_CONFIG.qType,
                rowNum: getRowNumber(value[0]) + 6,
                value:
                  value[
                    titleToNumber(ACTIVEPROJECT_CONFIG.qType.columnNum) - 2
                  ],
              },
              status: {
                ...ACTIVEPROJECT_CONFIG.status,
                rowNum: getRowNumber(value[0]) + 6,
                value:
                  value[
                    titleToNumber(ACTIVEPROJECT_CONFIG.status.columnNum) - 2
                  ],
              },
              startDate: {
                ...ACTIVEPROJECT_CONFIG.startDate,
                rowNum: getRowNumber(value[0]) + 6,
                value:
                  value[
                    titleToNumber(ACTIVEPROJECT_CONFIG.startDate.columnNum) - 2
                  ],
              },
              endDate: {
                ...ACTIVEPROJECT_CONFIG.endDate,
                rowNum: getRowNumber(value[0]) + 6,
                value:
                  value[
                    titleToNumber(ACTIVEPROJECT_CONFIG.endDate.columnNum) - 2
                  ],
              },
              reviewCompleted: {
                ...ACTIVEPROJECT_CONFIG.reviewCompleted,
                rowNum: getRowNumber(value[0]) + 6,
                value:
                  value[
                    titleToNumber(
                      ACTIVEPROJECT_CONFIG.reviewCompleted.columnNum
                    ) - 2
                  ],
              },
              averageHandlingTime: {
                ...ACTIVEPROJECT_CONFIG.averageHandlingTime,
                rowNum: getRowNumber(value[0]) + 6,
                value:
                  value[
                    titleToNumber(
                      ACTIVEPROJECT_CONFIG.averageHandlingTime.columnNum
                    ) - 2
                  ],
              },
            };
          });
          setDataWithFilter({ data: rows, filtered: rows });
          updatefilterconfig(rows);
          return res.data.values;
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!Object.keys(updates).length) {
      return;
    }
    Object.values(updates).forEach((update) => {
      const postData = async () => {
        const req = new Request(`/api/roster?range=${update.range}`);
        const response = await fetch(req, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(update.value),
        });
        return response;
      };
      postData();
    });
    const changes = convertToChangeHistory(updates);
    writeToChangeHistory(changes);
  }, [saveValues]);

  const applyfilter = (filter: Topprojectfilter) => {
    const filtered = dataWithFilter.data
      .filter((r) => (r.project.value || "").startsWith(filter.baseproject))
      .filter((r) => (r.workflow.value || "").startsWith(filter.workflow))
      .filter((r) => (r.qType.value || "").startsWith(filter.qtype));
    setDataWithFilter({ ...dataWithFilter, filtered });
    updatefilterconfig(filtered);
  };

  const handleTopFilterBaseProjectChange = (baseProject: string) => {
    setClearfilter(false);
    const prefix = baseProject.slice(0, 4);
    setTopprojectfilter({ ...topprojectfilter, baseproject: prefix });
    applyfilter({ ...topprojectfilter, baseproject: prefix });
  };
  const handleTopFilterProjectChange = (project: string) => {};

  const handleWorkFlowChange = (workflow: string) => {
    setClearfilter(false);
    const prefix = workflow.slice(0, 8);
    setTopprojectfilter({ ...topprojectfilter, workflow: prefix });
    applyfilter({ ...topprojectfilter, workflow: prefix });
  };

  const handleQTypeChange = (qtype: string) => {
    setClearfilter(false);
    const prefix = qtype.slice(0, 8);
    setTopprojectfilter({ ...topprojectfilter, qtype: prefix });
    applyfilter({ ...topprojectfilter, qtype: prefix });
  };

  const clearFilter = () => {
    setClearfilter(true);
    setTopprojectfilter({baseproject: '', workflow:'', qtype:""});
    setDataWithFilter({...dataWithFilter, filtered: dataWithFilter.data});
    updatefilterconfig(dataWithFilter.data);
  };

  const edit = () => {
    setSaveValues(true);
    const rows = [...dataWithFilter.filtered];
    selectedCheckbox.forEach((i) => {
      const row = rows.find((row) => row.bugId.rowNum === i)!;
      Object.values(row)
        .filter((v) => v.columnNum)
        .forEach((v) => (v.disabled = false));
    });
    setDataWithFilter({ ...dataWithFilter, filtered: rows });
  };

  const save = () => {
    const rows = [...dataWithFilter.filtered];
    rows.forEach((row) => {
      row.isChecked = false;
      Object.values(row)
        .filter((v) => v.columnNum)
        .forEach((v) => (v.disabled = true));
    });
    setDataWithFilter({ ...dataWithFilter, filtered: rows });
    setselectedCheckbox([]);
    setSaveValues(false);
  };

  const handleCheckBoxChange = (selected: number[]) => {
    setselectedCheckbox(selected);
  };

  const getTableData = (rows: ActiveProjectRow[], offset: number) => {
    return rows.slice(offset, 10 + offset);
  };

  const handleInputChange = (vr: ValueRange) => {
    const prev = JSON.parse(JSON.stringify(updates));
    prev[vr.range] = vr;
    setUpdates(prev);
  };

  const handleNav = async (nextPage: number) => {
    if (offset + nextPage < 0) {
      return;
    }
    setOffset(offset + nextPage);
  };
  const handleDownload = () => {
    const rows = [...dataWithFilter.filtered];
    let selectedCsvData = [] as string[][];
    let selectedRows = [] as Cell[][];
    selectedCheckbox.forEach((i) => {
      const row = rows.find((row) => row.bugId.rowNum === i)!;
      const arr = convertActiveProjectRowToArrayExcludeId(row);
      selectedRows.push(arr);
    });
    if (!selectedRows.length) {
      return;
    }
    let header = [] as string[];
    selectedRows[0].forEach((c) => header.push(c.label || ""));
    selectedCsvData.push(header);
    selectedRows.forEach((row) => {
      const rowData = [] as string[];
      row.forEach((c) => rowData.push(c.value || ""));
      selectedCsvData.push(rowData);
    });
    setCsvData(selectedCsvData);
  };
  return (
    <div>
      <Card>
        <CardHeader className="text-xl flex flex-row items-center justify-between">
          <div>Active Projects</div>
          <Nav />
        </CardHeader>
      </Card>
      <div className="ml-8 mt-8 flex flex-row">
        <Topbatchfilter
          onBaseProjectChange={handleTopFilterBaseProjectChange}
          onProjectChange={handleTopFilterProjectChange}
          onWorkFlowChange={handleWorkFlowChange}
          onQTypeChange={handleQTypeChange}
          activeProjectFilter={true}
          topprojectfilterconfig={topprojectfilterconfig}
          clearfilter ={clearfilter}
        />
        <Button onClick={clearFilter} className="bg-blue-100 mr-8">
          Clear Filter
        </Button>
      </div>
      <div className="grid justify-items-center">
        {dataWithFilter.filtered ? (
          <Projectdatagrid
            data={getTableData(dataWithFilter.filtered || [], offset)}
            onCheckBoxChange={handleCheckBoxChange}
            onInputChange={handleInputChange}
          />
        ) : (
          <img className="w-32 mt-12 mb-12" src={loading.src} alt="loading" />
        )}
      </div>

      <CardFooter className="flex flex-row justify-between mt-2">
        <div>
          <Button
            onClick={edit}
            className="bg-blue-100 mr-8"
            disabled={!selectedCheckbox.length}
          >
            Edit
          </Button>
          <Button
            onClick={save}
            className="bg-blue-100 mr-8"
            disabled={!selectedCheckbox.length || !saveValues}
          >
            Save
          </Button>
          <Button className="bg-blue-100 mr-8" onClick={() => handleDownload()} disabled={!selectedCheckbox.length}>
            <CSVLink filename="ActiveProjectData" data={csvData}>
              <IoCloudDownloadOutline />
            </CSVLink>
          </Button>
          <Addprojectrow rowNumber={dataWithFilter.data &&dataWithFilter.data.length || 0} />
        </div>
        <div className="flex flex-row mr-16">
          <div className="text-sm font-medium mr-16 mt-2">
            Total Records:
            {dataWithFilter.filtered && dataWithFilter.filtered.length}
          </div>
          <Button onClick={() => handleNav(-10)}>Previous</Button>
          <Button onClick={() => handleNav(10)}>Next</Button>
        </div>
      </CardFooter>
    </div>
  );
};

export default Activeprojects;
