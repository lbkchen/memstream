import React from 'react';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';

import { CardModel } from '../models/card';

import { useDB, postDB } from '../db/db';

import styles from './CardEditor.css';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

type MdeTabType = 'write' | 'preview';

const CardEditor: React.FC<{ selectedTab?: string }> = (props) => {
  const [frontContent, setFrontContent] = React.useState('');
  const [backContent, setBackContent] = React.useState('');

  const [selectedTab, setSelectedTab] = React.useState<MdeTabType>('write');

  const cards = useDB('cards');
  console.log(cards);

  const handleSubmit = async () => {
    // TODO: Handle type safety
    const card = {
      front: frontContent,
      back: backContent,
    };

    const response = await postDB(card);
    console.log({ response });
  };

  const handleCancel = () => {
    return;
  };

  return (
    <div className={`container ${styles.editor}`}>
      <div className={styles.editorTitle}>Editing Card</div>
      <div className={styles.editorContainer}>
        <div className={styles.editorLabel}>FRONT</div>
        <ReactMde
          value={frontContent}
          onChange={setFrontContent}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={(markdown) => {
            return Promise.resolve(converter.makeHtml(markdown));
          }}
        />
      </div>
      <div className={styles.editorContainer}>
        <div className={styles.editorLabel}>BACK</div>
        <ReactMde
          value={backContent}
          onChange={setBackContent}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={(markdown) => {
            return Promise.resolve(converter.makeHtml(markdown));
          }}
        />
      </div>

      <div className={styles.editorButtonGroup}>
        <span className={styles.editorButton}>
          <button type="button" className="button" onClick={handleCancel}>
            CANCEL
          </button>
        </span>
        <span className={styles.editorButton}>
          <button
            type="submit"
            className="button button--green"
            onClick={handleSubmit}
          >
            SUBMIT
          </button>
        </span>
      </div>
    </div>
  );
};

export default CardEditor;
