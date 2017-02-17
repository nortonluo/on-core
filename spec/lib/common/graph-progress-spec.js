// Copyright © 2017 Dell Inc. or its subsidiaries.  All Rights Reserved.

'use strict';
describe('GraphProgress', function() {
    var graph;
    var taskId;
    var graphId;
    var graphDescription;
    var taskProgress;
    var progressData;
    var GraphProgress;

    before(function() {
        helper.setupInjector([
            helper.require('/lib/common/graph-progress')
        ]);
        GraphProgress = helper.injector.get('GraphProgress');
    });

    beforeEach(function() {
        taskId = 'taskId';
        graphId = 'graphId';
        graph = {
            instanceId: graphId,
            name: 'test graph name',
            node: 'nodeId',
            tasks: {}
        };
        graphDescription = 'test graph description';
        graph.tasks[taskId] = {
            friendlyName: 'test task name',
            state: 'pending',
            terminalOnStates: ['succeeded']
        };
        taskProgress = {
            value: 1,
            maximum: 4,
            percentage: '25%',
            description: 'test task description'
        };
        progressData = {
            graphId: graphId,
            graphName: 'test graph name',
            nodeId: 'nodeId',
            progress: {
                value: 0,
                maximum: 1,
                percentage: '0%',
                description: graphDescription
            },
            taskProgress: {
                taskId: taskId,
                taskName: 'test task name',
                progress: {
                    value: 1,
                    maximum: 4,
                    percentage: '25%',
                    description: 'test task description'
                },
            }
        };
    });

    it('should get progress without taskProgress', function() {
        var progress = GraphProgress.create(graph, graphDescription);
        var progressData = progress.getProgressEventData();
        delete progressData.taskProgress;
        expect(progressData).to.be.equal(progressData);
    });

    it('should get progress with taskProgress and updated task percentage', function() {
        var progress = GraphProgress.create(graph, graphDescription);
        delete taskProgress.percentage;
        progress.updateTaskProgress(taskId, taskProgress, true);
        var progressData = progress.getProgressEventData();
        expect(progressData).to.be.equal(progressData);
    });

    it('should get progress with taskProgress and not updated task percentage', function() {
        var progress = GraphProgress.create(graph, graphDescription);
        taskProgress.value = 2;
        progress.updateTaskProgress(taskId, taskProgress, false);
        var progressData = progress.getProgressEventData();
        expect(progressData).to.be.equal(progressData);
    });
});
