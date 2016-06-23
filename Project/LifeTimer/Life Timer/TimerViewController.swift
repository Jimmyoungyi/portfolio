//
//  TimerViewController.swift
//  Life Timer
//
//  Created by yangjianyi on 16/5/6.
//  Copyright © 2016年 yangjianyi. All rights reserved.
//

import UIKit

class TimerViewController: UIViewController {
    
    var tool:Tool = Tool()
    var timer = NSTimer()
    var minute = 0
    var second = 0
    
    @IBOutlet weak var picker: UIPickerView!
    @IBOutlet weak var itemDisplay: UILabel!
    @IBOutlet weak var itemCount: UILabel!
    @IBOutlet weak var timeDisplay: UILabel!
    @IBOutlet weak var startButton: CustomButton!
    
    var currentCount: Int = 0
    var currentSection: Int = 0
    var currentRow: Int = 0
    var currentItem: Item?
    
    override func viewWillAppear(animated: Bool) {
        picker.reloadComponent(0)
        picker.reloadComponent(1)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        currentItem = DataManager.sharedInstance.sectionList[0][0]
            itemDisplay.text = currentItem!.name
            currentCount = Int(currentItem!.duration!)
            itemCount.text = tool.numberToTime(currentCount)
        
    }
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func StartTimer(sender: UIButton) {
        timer.invalidate()
        timer = NSTimer.scheduledTimerWithTimeInterval(1, target: self, selector: #selector(self.Timer), userInfo: nil, repeats: true)
        for list in DataManager.sharedInstance.sectionList{
            for item in list{
                item.duration = 0
            }
        }
        second = 0
        currentCount = 0
        itemCount.text = "0:00"
        timeDisplay.text = "0:00"
    }
    func Timer() -> Void {
        second += 1
        currentCount += 1
        itemCount.text = tool.numberToTime(currentCount)
        timeDisplay.text = tool.numberToTime(second)
    }
}

extension TimerViewController:UIPickerViewDataSource{
    func numberOfComponentsInPickerView(pickerView: UIPickerView) -> Int {
        return 2
    }
    func pickerView(pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        if component == 0{
            return DataManager.sharedInstance.list.count
        }else{
            return DataManager.sharedInstance.sectionList[currentSection].count
        }
    }
    func pickerView(pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        if component == 0{
            return DataManager.sharedInstance.list[row].name!
        }else{
            return DataManager.sharedInstance.sectionList[currentSection][row].name!
        }
    }
}

extension TimerViewController:UIPickerViewDelegate{
    
    func pickerView(pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
        if component == 0{
            currentSection = row
            picker.reloadComponent(1)
        }else{
            currentItem!.duration = Double(currentCount)
            DataManager.sharedInstance.save()
            currentRow = row
            currentItem = DataManager.sharedInstance.sectionList[currentSection][currentRow]
            itemDisplay.text = currentItem!.name
            currentCount = Int(currentItem!.duration!)
            itemCount.text = tool.numberToTime(currentCount)
        }
    }
}
