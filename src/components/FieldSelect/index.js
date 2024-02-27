import React from "react";
import { SelectList } from "react-native-dropdown-select-list";

const SelectFields = ({ handleChange, dataList, placeholder, id }) => {
    return (
        <SelectList
            setSelected={(val) => handleChange(id, val)}
            data={dataList.map((item, index) => {
                return { key: item.id, value: item.name }
            })}
            inputStyles={{
                width: '90%',
            }}
            boxStyles={{
                backgroundColor: '#fff',
                borderWidth: 1,
                paddingVertical: 15,
                width: '100%',
                marginTop: 10,
            }}
            placeholder={placeholder}
            dropdownStyles={{
                backgroundColor: '#fff',
            }}
            dropdownItemStyles={{
                width: '80%'
            }}
        />
    )
}

export default SelectFields;