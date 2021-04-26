import React from 'react';
import './App.css';
import { ToggleConfig } from './question/question.types';
import ToggleQuestion from './question/ToggleQuestion';

function App() {
    const toggles: ToggleConfig[] = [
        {
            name: 'active',
            options: [
                {
                    value: 'on',
                    label: 'On',
                },
                {
                    value: 'off',
                    label: 'Off',
                },
            ],
        },
        {
            name: 'colour',
            options: [
                {
                    value: 'blue',
                    label: 'Blue Hello Moon',
                },
                {
                    value: 'red',
                    label: 'Red',
                },
            ],
        },
        {
            name: 'direction',
            options: [
                {
                    value: 'up',
                    label: 'Up',
                },
                {
                    value: 'down',
                    label: 'Down',
                },
            ],
        },
    ];

    return (
        <div className="App">
            <form>
                <ToggleQuestion
                    question="What is your name?"
                    toggles={toggles}
                    correctAnswer={{
                        active: 'off',
                        colour: 'blue',
                        direction: 'up',
                    }}
                    defaultAnswer={{
                        active: 'on',
                        colour: 'red',
                        direction: 'down',
                    }}
                />
            </form>
        </div>
    );
}

export default App;
