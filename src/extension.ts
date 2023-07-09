import * as vscode from 'vscode';
import { JustFilesViewProvider } from './classes/justFilesViewProvider';
import { FoldersViewProvider } from './classes/foldersViewProvider';

export function activate(context: vscode.ExtensionContext) {
	const justFilesViewProvider = new JustFilesViewProvider();
	vscode.window.registerTreeDataProvider('justFilesView', justFilesViewProvider);

	const showDisposable = vscode.commands.registerCommand('just-files.show', (item) => {
		justFilesViewProvider.addFileItem(item);
		justFilesViewProvider.refresh();
	});

	const hideDisposable = vscode.commands.registerCommand('just-files.hide', (item) => {
		justFilesViewProvider.removeFileItem(item);
		justFilesViewProvider.refresh();
	});

	context.subscriptions.push(showDisposable);
	context.subscriptions.push(hideDisposable)

	const foldersViewProvider = new FoldersViewProvider();
	vscode.window.registerTreeDataProvider('foldersView', foldersViewProvider);
	vscode.commands.executeCommand('setContext', 'git.decorations.enabled', false);

	vscode.workspace.onDidChangeWorkspaceFolders(() => {
		foldersViewProvider.refresh();
	});

	vscode.workspace.onDidRenameFiles(() => {
		foldersViewProvider.refresh();
	});

	vscode.workspace.onDidChangeTextDocument(() => {
		foldersViewProvider.refresh();
	});

	vscode.workspace.onDidCreateFiles(() => {
		foldersViewProvider.refresh();
	});

	vscode.workspace.onDidDeleteFiles(() => {
		foldersViewProvider.refresh();
	});

}

export function deactivate() { }





