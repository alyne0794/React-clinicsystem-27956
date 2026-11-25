import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8083/api/offices";

function OfficeList({ refresh }) {
  const [offices, setOffices] = useState([]);
  const [search, setSearch] = useState("");

  const loadOffices = async () => {
    try {
      const res = await axios.get(API);
      setOffices(res.data);
    } catch (err) {
      alert("Could not load offices: " + err.message);
    }
  };

  // loads on first render, and again whenever `refresh` changes
  useEffect(() => {
    loadOffices();
  }, [refresh]);

  const handleDelete = async (office) => {
    if (!window.confirm(`Delete office ${office.roomNumber}?`)) return;
    try {
      const res = await axios.delete(`${API}/${office.id}`);
      alert(res.data.message);
      loadOffices();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed: " + err.message);
    }
  };

  const filtered = offices.filter((o) => {
    const term = search.trim().toLowerCase();
    return (
      String(o.name ?? "").toLowerCase().includes(term) ||
      String(o.roomNumber ?? "").toLowerCase().includes(term)
    );
  });

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Offices</h1>

      <input
        type="text"
        placeholder="Search by office name or number"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "6px", width: "300px", marginBottom: "15px" }}
      />

      <table
        border="1"
        cellPadding="8"
        style={{ margin: "0 auto", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Office Name</th>
            <th>Office Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan="3">No offices found</td>
            </tr>
          ) : (
            filtered.map((o) => (
              <tr key={o.id}>
                <td>{o.name}</td>
                <td>{o.roomNumber}</td>
                <td>
                  <button onClick={() => handleDelete(o)}>Delete</button>{" "}
                  <button
                    onClick={() =>
                      alert("Update will be done in the next class")
                    }
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default OfficeList;