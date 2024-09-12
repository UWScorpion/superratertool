"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Nav from "../components/Nav";
import Table from "../components/Table";
import Addrow from "../components/Addrow";
import Topbatchfilter from "../components/Topbatchfilter";
import { Button } from "@/components/ui/button";
import {
  SuperRaterRow,
  SUPERRATEROW_MAP,
  DataWithFilter,
  ValueRange,
  Record,
  PROJECT_TAB_CONFIG,
  USER_TAB_CONFIG,
  TOP_FILTER_CONFIG,
  Toprosterfilter,
  ChangeHistory,
  Cell,
} from "../common/constants";
import { CSVLink } from "react-csv";

import { useEffect, useState } from "react";
import {
  titleToNumber,
  getRowNumber,
  getOptions,
  formatDate,
  convertSuperRaterRowToArrayExcludeId,
} from "../common/utils";
import loading from "../../public/loading.gif";
import { IoCloudDownloadOutline } from "react-icons/io5";

const Srroster = () => {
  const [dataWithFilter, setDataWithFilter] = useState({} as DataWithFilter);
  const [selectedCheckbox, setselectedCheckbox] = useState([] as number[]);
  const [offset, setOffset] = useState(0);
  const [saveValues, setSaveValues] = useState(false);
  const [updates, setUpdates] = useState({} as Record);
  const [clearfilter, setClearfilter] = useState(false);
  const [csvData, setCsvData] = useState([] as string[][]);
  const [toprosterfilterconfig, setToprosterfilterconfig] = useState([
    PROJECT_TAB_CONFIG[0],
    PROJECT_TAB_CONFIG[1],
    USER_TAB_CONFIG[9],
    TOP_FILTER_CONFIG,
  ]);
  const [toprosterfilter, setToprosterfilter] = useState({
    baseproject: "",
    project: "",
    productionrole: "",
    superrator: "",
  });

  const updatefilterconfig = (rows: SuperRaterRow[]) => {
    const [
      baseprojectconfig,
      projectconfig,
      productionroleconfig,
      superratorconfig,
    ] = toprosterfilterconfig;
    const baseprojectoptions = getOptions(
      rows.map((row) => row.baseProject.value || "")
    );
    const projectoptions = getOptions(
      rows.map((row) => row.project.value || "")
    );
    const productionrolewoptions = getOptions(
      rows.map((row) => row.productionRole.value || "")
    );
    const superratoroptions = getOptions(
      rows.map((row) => row.superRaterName.value || "")
    );
    baseprojectconfig.options = baseprojectoptions;
    projectconfig.options = projectoptions;
    productionroleconfig.options = productionrolewoptions;
    superratorconfig.options = superratoroptions;
    setToprosterfilterconfig([
      baseprojectconfig,
      projectconfig,
      productionroleconfig,
      superratorconfig,
    ]);
  };

  const convertToChangeHistory = (updates: Record) => {
    const changes = {} as ChangeHistory;
    Object.values(updates).forEach((update) => {
      if (update.column && update.column.rowNum) {
        if (changes[update.column?.rowNum]) {
          const message = `Row: ${update.column.rowNum} Field: ${
            update.column.label
          }, updated: ${formatDate(new Date(Date.now()))}`;
          changes[update.column?.rowNum] =
            changes[update.column?.rowNum] + " " + message;
        } else {
          const message = `Row: ${update.column.rowNum} Field: ${
            update.column.label
          }, updated: ${formatDate(new Date(Date.now()))}`;
          changes[update.column?.rowNum] = message;
        }
      }
    });
    return changes;
  };

  const writeToChangeHistory = (changes: ChangeHistory) => {
    Object.entries(changes).forEach(([key, value]) => {
      const writedata = async () => {
        const req = new Request(`/api/roster?range=RosterChange!B${key}`);
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
      const queryParams = "range=Sheet1!B2:AG1582";
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
              id: `Roster:${
                value[
                  titleToNumber(SUPERRATEROW_MAP.superRaterLDAP.columnNum) - 2
                ]
              }-${value[0]}`,
              superRaterName: {
                ...SUPERRATEROW_MAP.superRaterName,
                rowNum: getRowNumber(value[0]),
                value:
                  value[
                    titleToNumber(SUPERRATEROW_MAP.superRaterName.columnNum) - 2
                  ],
              },
              superRaterLDAP: {
                ...SUPERRATEROW_MAP.superRaterLDAP,
                rowNum: getRowNumber(value[0]),
                value:
                  value[
                    titleToNumber(SUPERRATEROW_MAP.superRaterLDAP.columnNum) - 2
                  ],
              },
              baseProject: {
                ...SUPERRATEROW_MAP.baseProject,
                rowNum: getRowNumber(value[0]),
                value:
                  value[
                    titleToNumber(SUPERRATEROW_MAP.baseProject.columnNum) - 2
                  ],
              },
              project: {
                ...SUPERRATEROW_MAP.project,
                rowNum: getRowNumber(value[0]),
                value:
                  value[titleToNumber(SUPERRATEROW_MAP.project.columnNum) - 2],
              },
              currentTask: {
                ...SUPERRATEROW_MAP.currentTask,
                rowNum: getRowNumber(value[0]),
                value:
                  value[
                    titleToNumber(SUPERRATEROW_MAP.currentTask.columnNum) - 2
                  ],
              },
              assignedProject: {
                ...SUPERRATEROW_MAP.assignedProject,
                rowNum: getRowNumber(value[0]),
                value:
                  value[
                    titleToNumber(SUPERRATEROW_MAP.assignedProject.columnNum) -
                      2
                  ],
              },
              pod: {
                ...SUPERRATEROW_MAP.pod,
                rowNum: getRowNumber(value[0]),
                value: value[titleToNumber(SUPERRATEROW_MAP.pod.columnNum) - 2],
              },
              location: {
                ...SUPERRATEROW_MAP.location,
                rowNum: getRowNumber(value[0]),
                value:
                  value[titleToNumber(SUPERRATEROW_MAP.location.columnNum) - 2],
              },
              globalLogicEmail: {
                ...SUPERRATEROW_MAP.globalLogicEmail,
                rowNum: getRowNumber(value[0]),
                value:
                  value[
                    titleToNumber(SUPERRATEROW_MAP.globalLogicEmail.columnNum) -
                      2
                  ],
              },
              googleEmail: {
                ...SUPERRATEROW_MAP.googleEmail,
                rowNum: getRowNumber(value[0]),
                value:
                  value[
                    titleToNumber(SUPERRATEROW_MAP.googleEmail.columnNum) - 2
                  ],
              },
              onboardingStatus: {
                ...SUPERRATEROW_MAP.onboardingStatus,
                rowNum: getRowNumber(value[0]),
                value:
                  value[
                    titleToNumber(SUPERRATEROW_MAP.onboardingStatus.columnNum) -
                      2
                  ],
              },
              highestLevelofEducation: {
                ...SUPERRATEROW_MAP.highestLevelofEducation,
                rowNum: getRowNumber(value[0]),
                value:
                  value[
                    titleToNumber(
                      SUPERRATEROW_MAP.highestLevelofEducation.columnNum
                    ) - 2
                  ],
              },
              allAssociatedRoles: {
                ...SUPERRATEROW_MAP.allAssociatedRoles,
                rowNum: getRowNumber(value[0]),
                value:
                  value[
                    titleToNumber(
                      SUPERRATEROW_MAP.allAssociatedRoles.columnNum
                    ) - 2
                  ],
              },
              productionRole: {
                ...SUPERRATEROW_MAP.productionRole,
                rowNum: getRowNumber(value[0]),
                value:
                  value[
                    titleToNumber(SUPERRATEROW_MAP.productionRole.columnNum) - 2
                  ],
              },
              vendorOnboardedDate: {
                ...SUPERRATEROW_MAP.vendorOnboardedDate,
                rowNum: getRowNumber(value[0]),
                value:
                  value[
                    titleToNumber(
                      SUPERRATEROW_MAP.vendorOnboardedDate.columnNum
                    ) - 2
                  ],
              },
              productionReadyDate: {
                ...SUPERRATEROW_MAP.productionReadyDate,
                rowNum: getRowNumber(value[0]),
                value:
                  value[
                    titleToNumber(
                      SUPERRATEROW_MAP.productionReadyDate.columnNum
                    ) - 2
                  ],
              },
              estDateofProdStart: {
                ...SUPERRATEROW_MAP.estDateofProdStart,
                rowNum: getRowNumber(value[0]),
                value:
                  value[
                    titleToNumber(
                      SUPERRATEROW_MAP.estDateofProdStart.columnNum
                    ) - 2
                  ],
              },
              releasedfromOnboarding: {
                ...SUPERRATEROW_MAP.releasedfromOnboarding,
                rowNum: getRowNumber(value[0]),
                value:
                  value[
                    titleToNumber(
                      SUPERRATEROW_MAP.releasedfromOnboarding.columnNum
                    ) - 2
                  ],
              },
              majorAreaofStudy: {
                ...SUPERRATEROW_MAP.majorAreaofStudy,
                rowNum: getRowNumber(value[0]),
                value:
                  value[
                    titleToNumber(SUPERRATEROW_MAP.majorAreaofStudy.columnNum) -
                      2
                  ],
              },
              technicalLanguageSkills: {
                ...SUPERRATEROW_MAP.technicalLanguageSkills,
                rowNum: getRowNumber(value[0]),
                value:
                  value[
                    titleToNumber(
                      SUPERRATEROW_MAP.technicalLanguageSkills.columnNum
                    ) - 2
                  ],
              },
              notes: {
                ...SUPERRATEROW_MAP.notes,
                rowNum: getRowNumber(value[0]),
                value:
                  value[titleToNumber(SUPERRATEROW_MAP.notes.columnNum) - 2],
              },
              prodLead: {
                ...SUPERRATEROW_MAP.prodLead,
                rowNum: getRowNumber(value[0]),
                value:
                  value[titleToNumber(SUPERRATEROW_MAP.prodLead.columnNum) - 2],
              },
              prodLeadLdap: {
                ...SUPERRATEROW_MAP.prodLeadLdap,
                rowNum: getRowNumber(value[0]),
                value:
                  value[
                    titleToNumber(SUPERRATEROW_MAP.prodLeadLdap.columnNum) - 2
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

  const handleInputChange = (vr: ValueRange) => {
    const prev = JSON.parse(JSON.stringify(updates));
    prev[vr.range] = vr;
    setUpdates(prev);
  };

  const applyfilter = (filter: Toprosterfilter, updateconfig = true) => {
    let filtered = dataWithFilter.data;
    if (filter.baseproject) {
      filtered = dataWithFilter.data.filter((r) =>
        (r.baseProject.value || "").startsWith(filter.baseproject)
      );
    }

    if (filter.project) {
      filtered = filtered.filter(
        (r) => (r.project.value || "") === filter.project
      );
    }
    if (filter.productionrole) {
      filtered = filtered.filter(
        (r) => (r.productionRole.value || "") === filter.productionrole
      );
    }
    if (filter.superrator) {
      const names = filter.superrator.split(",").filter((n) => n);

      if (!dataWithFilter.data) {
        return;
      }
      filtered = filtered.filter(
        (r) => names.indexOf(r.superRaterName.value || "") !== -1
      );
    }
    setDataWithFilter({ ...dataWithFilter, filtered });
    if (!updateconfig) {
      return;
    }
    updatefilterconfig(filtered);
  };

  const handleTopFilterBaseProjectChange = (baseProject: string) => {
    setClearfilter(false);
    const prefix = baseProject.slice(0, 4);
    setToprosterfilter({ ...toprosterfilter, baseproject: prefix });
    applyfilter({ ...toprosterfilter, baseproject: prefix });
  };

  const handleTopFilterProjectChange = (project: string) => {
    setClearfilter(false);
    setToprosterfilter({ ...toprosterfilter, project });
    applyfilter({ ...toprosterfilter, project });
  };

  const handleTopFilterProductionRoleChange = (productionrole: string) => {
    setClearfilter(false);
    setToprosterfilter({ ...toprosterfilter, productionrole });
    applyfilter({ ...toprosterfilter, productionrole });
  };

  const handleNameChange = (name: string) => {
    setClearfilter(false);
    if (!name) return;
    setToprosterfilter({ ...toprosterfilter, superrator: name });
    applyfilter({ ...toprosterfilter, superrator: name }, false);
  };

  const handleCheckBoxChange = (selected: number[]) => {
    setselectedCheckbox(selected);
  };

  const edit = () => {
    setSaveValues(true);
    const rows = [...dataWithFilter.filtered];
    selectedCheckbox.forEach((i) => {
      const row = rows.find((row) => row.superRaterName.rowNum === i)!;
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

  const handleNav = async (nextPage: number) => {
    if (offset + nextPage < 0) {
      return;
    }
    setOffset(offset + nextPage);
  };

  const getTableData = (rows: SuperRaterRow[], offset: number) => {
    return rows.slice(offset, 10 + offset);
  };

  const clearFilter = () => {
    setClearfilter(true);
    setToprosterfilter({
      baseproject: "",
      project: "",
      productionrole: "",
      superrator: "",
    });
    setDataWithFilter({ ...dataWithFilter, filtered: dataWithFilter.data });
    updatefilterconfig(dataWithFilter.data);
  };

  const handleDownload = () => {
    const rows = [...dataWithFilter.filtered];
    let selectedCsvData = [] as string[][];
    let selectedRows = [] as Cell[][];
    selectedCheckbox.forEach((i) => {
      const row = rows.find((row) => row.superRaterName.rowNum === i)!;
      const arr = convertSuperRaterRowToArrayExcludeId(row);
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
          <div>Roster</div>
          <Nav />
        </CardHeader>
      </Card>

      {dataWithFilter.data && (
        <div className="ml-8 mt-8 flex flex-row">
          <Topbatchfilter
            onNameChange={handleNameChange}
            onBaseProjectChange={handleTopFilterBaseProjectChange}
            onProjectChange={handleTopFilterProjectChange}
            onProductionRoleChange={handleTopFilterProductionRoleChange}
            toprosterfilterconfig={toprosterfilterconfig}
            clearfilter={clearfilter}
          />
          <Button onClick={clearFilter} className="bg-blue-100 mr-8">
            Clear Filter
          </Button>
        </div>
      )}
      {/* <Datagrid data={srrosterRows}/> */}
      <div className="grid justify-items-center">
        {dataWithFilter.filtered ? (
          <Table
            data={getTableData(dataWithFilter.filtered || [], offset)}
            onCheckBoxChange={handleCheckBoxChange}
            onInputChange={handleInputChange}
          />
        ) : (
          <img className="w-32 mt-12 mb-12" src={loading.src} alt="loading" />
        )}
      </div>
      <CardFooter className=" flex flex-row justify-between mt-2">
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
            <CSVLink filename="RosterData" data={csvData}>
              <IoCloudDownloadOutline />
            </CSVLink>
          </Button>
          <Addrow
            rowNumber={(dataWithFilter.data && dataWithFilter.data.length) || 0}
          />
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

export default Srroster;
