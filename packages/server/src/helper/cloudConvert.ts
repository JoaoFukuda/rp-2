/* eslint-disable @typescript-eslint/camelcase */
import CloudConvert from 'cloudconvert'
import request from 'request'
import fs from 'fs'

// eslint-disable-next-line max-len
const cloudConvert = new CloudConvert('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZjA5NDhhZDk4ZWFlOTc1MzY2MzU2OGQzMmNlNTQ0ZGJjOGUyYzM3NGNkZGM4ZTBlYWNmOTgwMThkMmU4YjEzMTQyOGFkMDg0ZDM4MDM0NzUiLCJpYXQiOjE2MDIyMDE4MTIsIm5iZiI6MTYwMjIwMTgxMiwiZXhwIjo0NzU3ODc1NDEyLCJzdWIiOiI0NTc0MDExNCIsInNjb3BlcyI6WyJ0YXNrLnJlYWQiLCJ0YXNrLndyaXRlIl19.sFGKS2OxqHmidhUpvE-Xi62QwJ5smMoBzOhqRkYkUsa1hlMD-GXGWe3JYhy44AgePSmD8xPlt0i7k4bPVjmP1jk41V-TLdROcfessiPYgZ_MT48ZLGJpkNFM1D6POpfyqClLKJdGDQjHEZja9t3nXRpYSOQrvN1iMboXHwsCUx3WTC3JtQLPum03uYJsDHEVa1ecXi2m09fI_qYvwP94BuVgX7Oh9lPOO5855LTG9WDD7Xb7RPMJs-Sle2zqe_L2nDVUAXw1WUOFLo0X9F5XYYT46Q48LZwrhKZtLUBWrZQwEg0y845ZQC8HCEy7sZymYzJfJQG1WA6xCNnvEK2qsZvN8gnP5kJTGVKdQdSeNPC9DbVAn1uyuCYOYt1U-cw7jadBCBxuNjKcO-mq0bGEwiDL5VbWg8baBU_8CPI5LXmd52jH0SzZGUHWuWas7lYIrfbr0RXFO_ug5iUqPWS5mRmzQnDtISFdK2Pvc5mRZHZav_eYolgsI2U59lXkCV_-4En0VVOOvHsjYN-5Q6nQVSJ5oSrV3mYPzmkcUzpiOEHQB_JmTUOAF6QL9axNtH8QJOUs2htl7undTYtwHf93KqpSyCLnNKzVDXBGd5z2x_8IFSR1dh0kwD03VroGXH17exqsVBxA8j20TOv1tIbWcnvrU2P2AcS1-GqM1YpyF6I')

export const makeRequest = async (filePath: string) => {
  let job = await cloudConvert.jobs.create({
    tasks: {
      import: {
        operation: 'import/upload',
      },
      convert: {
        operation: 'convert',
        input_format: 'tex',
        output_format: 'txt',
        engine: 'pandoc',
        input: [
          'import',
        ],
        filename: 'output.txt',
      },
      export: {
        operation: 'export/url',
        input: [
          'convert',
        ],
        inline: true,
        archive_multiple_files: false,
      },
    },
  })
  const importTask = job.tasks.filter(task => task.name === 'import')[0]
  const inputFile = fs.createReadStream(filePath)
  cloudConvert.tasks.upload(importTask, inputFile, 'file.tex')
  job = await cloudConvert.jobs.wait(job.id)
  const exportTask = job.tasks
    .filter(
      (task: {
        operation: string; status: string
      }) => task.operation === 'export/url' && task.status === 'finished')[0]

  if (!exportTask || !exportTask.result || !exportTask.result.files) return undefined
  const file = exportTask.result.files[0]

  const convertedFileName = filePath.replace(/\.tex$/, '.txt')

  return new Promise((resolve, reject) => {
    request(file.url as string, { encoding: 'binary' }, (_error, _response, body) => fs.writeFile(
      convertedFileName, body, 'binary', err => {
        if (err) {
          reject(err)
        }
        return resolve(convertedFileName)
      }))
  })
}
