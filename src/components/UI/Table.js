import React from 'react'
import PropTypes from 'prop-types'
import { redMarkerText } from '../../util/text';

export const Table = ({head, body, sizing}) => {
  const sum = sizing?.reduce?.((total, current) => {
      return total + current;
  }, 0);
  const nSizing = sizing?.map?.(num => (num / sum)*100)

  return (
  <div class="flex flex-col">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div class="overflow-hidden">
          <table class="min-w-full">
            <thead class="bg-white border-b">
              <tr>
                {
                  
                  head?.map?.((col, index) =>
                    <th scope="col" width={nSizing?.[index] + "%"}
                    class={
                      index === 0
                      ? "text-3xl font-black text-white bg-blue-darker px-6 py-4 text-left"
                      : "text-3xl font-black text-white bg-blue-darker px-6 py-4 text-center"
                    }>
                      {redMarkerText(col)}
                    </th>
                  )
                }
              </tr>
            </thead>
            <tbody>
              {
                body?.map?.((row, index) => 
                  <tr class={
                    index % 2 ? "bg-white border-b"
                    : "bg-gray-100 border-b"
                  }>
                    {
                      row.map((col, index) =>
                        <td
                        width={nSizing?.[index] + "%"}
                        class={
                          index === 0
                          ? "px-6 py-4 whitespace-nowrap text-3xl font-medium text-gray-900 text-left"
                          : "text-3xl text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center"}>
                          {redMarkerText(col)}
                        </td>
                      )
                    }
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  )
}

Table.propTypes = {

  head: PropTypes.arrayOf(PropTypes.string),
  body: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  sizing: PropTypes.arrayOf(PropTypes.number)
}

Table.defaultProps = {
  head: ["?????????????????? 1", "?????????????????? 2", "?????????????????? 3", "?????????????????? 4"],
  body: [
    ["???????????? 11", "???????????? 12", "???????????? 13", "__*__"],
    ["???????????? 21", "???????????? 22", "???????????? 23", "???????????? __24__"],
    ["???????????? 31", "???????????? 32", "???????????? 33", "__??__??__??__??__??__?? __3__4"],
  ],
  sizing: [1,2,2,1]
}