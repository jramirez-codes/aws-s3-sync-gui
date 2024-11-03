# AWS S3 Sync GUI

A desktop GUI application for synchronizing local files and directories with Amazon S3, built with [Tauri](https://tauri.app/) and [Schadui](https://github.com/muhammadmuzzammil1998/schadui). This application provides a user-friendly interface for the AWS CLI `s3 sync` command, making it easy to transfer files between a local directory and an S3 bucket.

## Features

- **One-click Sync**: Synchronize your local directory with an S3 bucket effortlessly.
- **User-Friendly Interface**: Built with Schadui for an intuitive GUI experience.
- **Customizable Options**: Configure sync options such as direction (local-to-S3 or S3-to-local), recursive sync, exclusions, and more.
- **Seamless Tauri Integration**: Utilizes Tauri's shell command API to execute AWS CLI s3 sync command securely.

## Prerequisites

- **AWS CLI**: The application relies on the AWS CLI for the `s3 sync` operation. Ensure it is installed and configured with appropriate credentials. Install and configure using:
  ```bash
  aws configure
  ```
- **Node.js and npm**: Required for building the Tauri and Schadui components.
- **Rust and Cargo**: Required for compiling the Tauri backend.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/aws-s3-sync-gui.git
   cd aws-s3-sync-gui
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the application:
   ```bash
   npm run tauri build
   ```

## Usage

1. Open the application.
2. Configure the sync options:
   - **Source Directory**: Local folder to sync from.
   - **Target Bucket**: S3 bucket and directory to sync to.
   - Additional options (e.g., recursive, exclude patterns).
3. Click **Sync** to start the process.

The application will display logs and progress for each sync operation.

## Development

To run the application in development mode:

```bash
npm run tauri dev
```

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any changes or improvements.
