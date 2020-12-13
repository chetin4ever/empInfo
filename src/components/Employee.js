import React, { Component } from "react"
import EmpData from "../empData.json"

import Dropdown from "react-dropdown"
import "react-dropdown/style.css"

class Employee extends Component {
  state = {
    sname: "",
    department: "",
  }
  searchHandler = (e) => {
    this.setState({
      sname: e.target.value,
    })
  }
  onSelect = (e) => {
    this.setState({
      department: e.value,
    })
  }
  render() {
    const { sname, department } = this.state
    //console.log(sname)
    const filteremp = EmpData.filter((emp) => {
      return emp.firstName.toLowerCase().indexOf(sname.toLowerCase()) !== -1
    })
    const filterByDepartment = EmpData.filter((emp) => {
      return (
        emp.department.toLowerCase().indexOf(department.toLowerCase()) !== -1
      )
    })
    let filterdata
    if (sname !== "") {
      filterdata = filteremp
    } else if (department !== "") {
      filterdata = filterByDepartment
    } else {
      filterdata = EmpData
    }
    //console.log(filteremp)
    //console.log(filterByDepartment)

    const options = ["IT", "Finance", "Marketing"]
    const defaultOption = options[0]
    return (
      <div>
        <input type='text' onChange={this.searchHandler} />
        <div>
          <Dropdown
            options={options}
            onChange={this.onSelect}
            value={defaultOption}
            placeholder='Select an option'
          />
        </div>

        <div className='container'>
          <div className='row'>
            <table className='table table-striped'>
              <thead className='thead-inverse'>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Department</th>

                  <th />
                </tr>
              </thead>
              <tbody>
                {filterdata.map((emp) => {
                  return (
                    <tr key={emp.id}>
                      <td>
                        {emp.firstName} {emp.lastName}
                      </td>
                      <td>{emp.email}</td>
                      <td>{emp.phoneNumber}</td>
                      <td>{emp.department}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}
export default Employee
