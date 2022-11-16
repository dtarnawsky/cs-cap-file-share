# File Download and Share
This is a sample Capacitor application that downloads a PDF file then shares it using `@capacitor/filesystem` and `@capacitor/share`.

## Notes

- bug to fix: PDF is downloaded and written to file as UTF-8 using `Blob.text()` which when read is altering some characters in the final file.
- When saved to `data` folder it relies on the entry `<files-path name="data" path="." />` in `file_paths.xml` which isnt working.
