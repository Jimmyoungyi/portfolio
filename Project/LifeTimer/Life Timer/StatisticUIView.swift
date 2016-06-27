//
//  StatisticUIView.swift
//  Life Timer
//
//  Created by yangjianyi on 16/5/19.
//  Copyright © 2016年 yangjianyi. All rights reserved.
//

import UIKit

class StatisticUIView: UIView {

    override func drawRect(rect: CGRect) {

        
        
        var totalduration = 0
        var recordedduration = 0
        var i = 0
        var u = 0
        

        
        
        for list in DataManager.sharedInstance.sectionList{
            for item in list{
                totalduration += Int(item.duration!)
            }
        }
        for list in DataManager.sharedInstance.sectionList{
            let hue = 1 / CGFloat(DataManager.sharedInstance.sectionList.count) * CGFloat(i)
            u = 0
            for item in list{
                let brightness = 0.8 - 0.4 / CGFloat(DataManager.sharedInstance.sectionList[i].count) * CGFloat(u)
                
                let start = 0 - M_PI_2 + M_PI * 2 * Double(recordedduration) / Double(totalduration)
                let end = M_PI * 2 * Double(item.duration!) / Double(totalduration)  + start
                
                let circlePath = UIBezierPath(arcCenter: CGPoint(x: bounds.width/2,y: 175), radius: CGFloat(150), startAngle: CGFloat(start), endAngle:CGFloat(end), clockwise: true)
                circlePath.addLineToPoint(CGPoint(x: bounds.width/2,y:175))
                let shapeLayer = CAShapeLayer()
                shapeLayer.path = circlePath.CGPath
                shapeLayer.fillColor = UIColor.init(hue: hue, saturation: 0.6, brightness: brightness, alpha: 1).CGColor
                self.layer.addSublayer(shapeLayer)

                recordedduration += Int(item.duration!)
                u += 1
            }
            i += 1
        }
    }


}
