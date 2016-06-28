//
//  StatisticViewController.swift
//  Life Timer
//
//  Created by yangjianyi on 16/5/19.
//  Copyright © 2016年 yangjianyi. All rights reserved.
//

import UIKit

class StatisticViewController: UIViewController {
    
    @IBOutlet weak var table: UITableView!
    @IBOutlet weak var draw: StatisticUIView!
    
    override func viewWillAppear(animated: Bool) {
        table.reloadData()
        draw.setNeedsDisplay()
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
extension StatisticViewController: UITableViewDataSource{
    func tableView(tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        let  headerCell = tableView.dequeueReusableCellWithIdentifier("headerCell")!
        headerCell.backgroundColor = UIColor.lightGrayColor()
        headerCell.textLabel!.text = DataManager.sharedInstance.list[section].name!
        
        return headerCell
    }
    
    func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        return DataManager.sharedInstance.list.count
    }
    
    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCellWithIdentifier("listCell")!
        let hue = 1 / CGFloat(DataManager.sharedInstance.sectionList.count) * CGFloat(indexPath.section)
        let brightness = 0.8 - 0.4 / CGFloat(DataManager.sharedInstance.sectionList[indexPath.section].count) * CGFloat(indexPath.row)
        cell.backgroundColor = UIColor.init(hue: hue, saturation: 0.6, brightness: brightness, alpha: 1)
        cell.textLabel?.text = DataManager.sharedInstance.sectionList[indexPath.section][indexPath.row].name
        cell.textLabel!.textColor = UIColor.whiteColor()
        return cell
    }
    
    func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return DataManager.sharedInstance.sectionList[section].count
    }
}
extension StatisticViewController: UITableViewDelegate{
}