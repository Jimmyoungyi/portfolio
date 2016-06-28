//
//  File.swift
//  Life Timer
//
//  Created by yangjianyi on 16/5/19.
//  Copyright © 2016年 yangjianyi. All rights reserved.
//

import Foundation

class Tool {
    func numberToTime(number:Int)->String{
        let minute = number/60
        let second = number%60
        var time = ""
        if second<10{
            time = "\(minute):0\(second)"
        }else{
            time = "\(minute):\(second)"
        }
        return time
    }
}