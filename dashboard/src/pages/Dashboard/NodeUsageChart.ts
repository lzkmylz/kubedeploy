import echarts from 'echarts/lib/echarts';
import { V1Node } from '@kubernetes/client-node';

function formatOption(formatMessage: any) {
    let option = {
      title: {
        text: formatMessage.titleText,
        subtext: formatMessage.titleSubtext,
      },
      series: [{
        type: 'pie',
        radius: '25%',
        center: ['50%', '50%'],
        data: formatMessage.data,
        animation: false,
        label: {
          position: 'outer',
          alignTo: 'none',
          bleedMargin: 5
        },
      }]
    };

    return option;
}

export function getNodeUsageChartOptions(data: V1Node) {
  let nodeStatus = data.status;
  let nodeMetadata = data.metadata;
  let nodeCapacity = nodeStatus?.capacity;
  let nodeAllocatable = nodeStatus?.allocatable;
  let pattern = /[123456789]+/;
  let nodeName = nodeMetadata?.name;
  let avaiableStorage = nodeAllocatable ? Number(pattern.exec(nodeAllocatable['ephemeral-storage'])) : 0;
  let totalStorage = nodeCapacity ? Number(pattern.exec(nodeCapacity['ephemeral-storage'])) : 0;
  let storageUnit = nodeAllocatable ? nodeAllocatable['ephemeral-storage'].slice(nodeAllocatable['ephemeral-storage'].length-2) : '';
  let avaiableMemory = nodeAllocatable ? Number(pattern.exec(nodeAllocatable['memory'])) : 0;
  let totalMemory = nodeCapacity ? Number(pattern.exec(nodeCapacity['memory'])) : 0;
  let memoryUnit = nodeAllocatable ? nodeAllocatable['memory'].slice(nodeAllocatable['memory'].length-2) : 0;
  let cpuOptionData = {
    titleText: nodeName,
    titleSubtext: 'CPU Status',
    data: [{
      name: 'Allocatable',
      value: nodeAllocatable ? Number(nodeAllocatable['cpu']) : 0,
    }, {
      name: 'Used',
      value: nodeAllocatable && nodeCapacity ? Number(nodeCapacity['cpu'])-Number(nodeAllocatable['cpu']) : 0,
    }]
  };
  let storageOptionData = {
    titleText: nodeName,
    titleSubtext: `Storage Status (${storageUnit})`,
    data: [{
      name: 'Allocatable',
      value: avaiableStorage,
    }, {
      name: 'Used',
      value: totalStorage - avaiableStorage,
    }]
  };
  let memoryOptionData = {
    titleText: nodeName,
    titleSubtext: `Memory Status (${memoryUnit})`,
    data: [{
      name: 'Allocatable',
      value: avaiableMemory
    }, {
      name: 'Used',
      value: totalMemory - avaiableMemory
    }]
  };
  let options = {
    CPUOption: formatOption(cpuOptionData),
    storageOption: formatOption(storageOptionData),
    memoryOption: formatOption(memoryOptionData),
  }
  return options;
}